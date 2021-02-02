import { call, put, takeEvery } from 'redux-saga/effects'
import {
  AUTHENTICATE_USER_REQUEST,
  authenticateUserSuccess,
  authenticateUserFailure,

  setMuteList,

  setAccountList,

} from './actions'

import {
  keychainSignIn,
  fetchProfile,
  isWifValid,
  packLoginData,
  getCommunityRole,
  fetchMuteList,
} from 'services/api'

import { generateSession } from 'services/helper'

function* authenticateUserRequest(payload, meta) {
  const { password, useKeychain } = payload
  let { username } = payload 
  username = `${username}`.toLowerCase()

  const user = { username, useKeychain, isAuthenticated: false, isSubscribe: false }

  let users = yield call([localStorage, localStorage.getItem], 'user')
  let accounts = yield call([localStorage, localStorage.getItem], 'accounts')

  if (!users || !Array.isArray(JSON.parse(users))) {
    users = []
  } else {
    users = JSON.parse(users)
  }

  const initialUsersLength = users.length

  if (!accounts) {
    accounts = []
  } else {
    accounts = JSON.parse(accounts)
  }

  try {
    if (useKeychain) {
      const data = yield call(keychainSignIn, username)
      if (data.success) {
        user.isAuthenticated = true
      } else {
        let profile = yield call(fetchProfile, [username])

        if (profile) {
          profile = profile[0]
        }
        
        if (profile) {
          const pubWif = profile['posting'].key_auths[0][0]
          try {
            const isValid = isWifValid(password, pubWif)
            user.isAuthenticated = isValid
            user.loginData = packLoginData(username, password)
          } catch (e) {
            user.isAuthenticated = false
          }
        } else {
          user.isAuthenticated = false
        }
      }

      if (user.isAuthenticated) {
        const isSubscribe = yield call(getCommunityRole, username)
        user.isSubscribe = isSubscribe
        user.active = true

        let mutelist = yield call(fetchMuteList, username)

        mutelist = [ ...new Set(mutelist.map(item => item.following))]

        yield put(setMuteList(mutelist))

        const session = generateSession(user)

        const isInAccountList = accounts.filter(item => item.username === username)

        if (isInAccountList.length === 0) {
          users.push(session)
          accounts.push({ username, keychain: useKeychain })
        }

        yield call([localStorage, localStorage.clear])
        yield call([localStorage, localStorage.setItem], 'user', JSON.stringify(users))
        yield call([localStorage, localStorage.setItem], 'active', username)
        yield call([localStorage, localStorage.setItem], 'accounts', JSON.stringify(accounts))
        yield put(setAccountList(accounts))
      }

      if (initialUsersLength > 0 && users.length !== initialUsersLength) {
        window.location.reload()
      }
      yield put(authenticateUserSuccess(user, meta))
    }
  } catch(error) {
    yield put(authenticateUserFailure(error, meta))
  }
}



function* watchAuthenticationUserRequest({ payload, meta }) {
  yield call(authenticateUserRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(AUTHENTICATE_USER_REQUEST, watchAuthenticationUserRequest)
}
