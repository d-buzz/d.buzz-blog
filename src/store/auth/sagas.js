import { call, put, takeEvery, select } from "redux-saga/effects"
import {
  AUTHENTICATE_USER_REQUEST,
  authenticateUserSuccess,
  authenticateUserFailure,

  GET_SAVED_USER_REQUEST,
  getSavedUsersSuccess,
  getSavedUsersFailure,

  setMuteList,
  setAccountList,
  setOpacityUsers,
  setHasAgreedPayout,

  MUTE_USER_REQUEST,
  muteUserSuccess,
  muteUserFailure,

  SIGNOUT_USER_REQUEST,
  signoutUserSuccess,
  signoutUserFailure,

  CHECK_HAS_UPDATE_AUTHORITY_REQUEST,
  checkHasUpdateAuthoritySuccess,
  checkHasUpdateAuthorityFailure,

} from './actions'

import {
  keychainSignIn,
  fetchProfile,
  isWifValid,
  packLoginData,
  getCommunityRole,
  fetchMuteList,
  generateMuteOperation,
  broadcastKeychainOperation,
  extractLoginData,
  broadcastOperation,
} from 'services/api'

import { generateSession, readSession } from 'services/helper'

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
      }
    } else {

      let profile = yield call(fetchProfile, [username])

      if (profile) {
        profile = profile[0]
      }

      if(profile) {
        const pubWif =  profile['posting'].key_auths[0][0]
        try {
          const isValid = isWifValid(password, pubWif)
          user.isAuthenticated = isValid
          user.login_data = packLoginData(username, password)
        } catch(e) {
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

      mutelist = [...new Set(mutelist.map(item => item.following))]

      yield put(setMuteList(mutelist))

      const session = generateSession(user)

      // const isInAccountList = accounts.filter(item => item.username === username)

      // if(isInAccountList.length === 0) {
      //   users.push(session)
      //   accounts.push({ username, keychain: useKeychain })
      // }

      const accountIndex = accounts.findIndex(item => item.username === username)

      if(accountIndex === -1) {
        accounts.push({ username, keychain: useKeychain })
      } else {
        accounts[accountIndex].keychain = useKeychain
      }

      users.push(session)

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
    } catch(error) {
      yield put(authenticateUserFailure(error, meta))
    }
  }

function* getSavedUserRequest(meta) {
  let user = { username: '', useKeychain: false, isAuthenticated: false }
  try {
    let saved = yield call([localStorage, localStorage.getItem], 'user')
    let active = yield call([localStorage, localStorage.getItem], 'active')
    let accounts = yield call([localStorage, localStorage.getItem], 'accounts')

    if (!accounts) {
      accounts = []
    } else {
      accounts = JSON.parse(accounts)
    }

    saved = JSON.parse(saved)

    try {
      const parseActive = JSON.parse(active) 
      active = parseActive
    } catch (e) {}

    if (active !== null && saved !== null && Array.isArray(saved) && active && saved.length !== 0) {
      //note: I still have to know the meaning behind this...
      let activeUser = null
      saved.forEach((item) => {
        const decrypted = readSession(item)

        if (decrypted.username === active) {
          activeUser = decrypted
        }
      })
      user = activeUser
    }

    if (user.isAuthenticated) {
      let mutelist = yield call(fetchMuteList, user.username)
      mutelist = [ ...new Set(mutelist.map(item => item.following))]
      yield put(setMuteList(mutelist))
      yield put(setOpacityUsers([]))
    }

    let payoutAgreed = yield call([localStorage, localStorage.getItem], 'payoutAgreed')

    if (payoutAgreed === null) {
      payoutAgreed = false
    }

    yield put(setAccountList(accounts))
    yield put(setHasAgreedPayout(payoutAgreed))
    
    yield put(getSavedUsersSuccess(user, meta))
  } catch (error) {
    yield put(getSavedUsersFailure(error, meta))
  }
}

function* muteUserRequest(payload, meta) {
  try {
    const { user: following } = payload
    const user = yield select(state => state.auth.get('user'))

    const { username: follower, useKeychain } = user

    const operation = yield call(generateMuteOperation, follower, following)

    let success = false

    if (useKeychain) {
      const result = yield call(broadcastKeychainOperation, follower, operation)
      success = result.success
    } else {
      let { login_data } = user
      login_data = extractLoginData(login_data)

      const wif = login_data[1]
      const result = yield call(broadcastOperation, operation, [wif])

      success = result.success
    }

    if (!success) {
      yield put(muteUserFailure('Unable to publish post', meta))
    } else {
      const mutelist = yield select(state => state.auth.get('mutelist'))
      mutelist.push(following)

      const opacityUsers = yield select(state => state.auth.get('opacityUsers'))
      opacityUsers.push(following)
      yield put(setOpacityUsers(opacityUsers))
      yield put(setMuteList(mutelist))
      yield put(muteUserSuccess(meta))
    }

  } catch(error) {
    yield put(muteUserFailure(error, meta))
  }
}

function* checkHasUpdateAuthorityRequest(payload, meta) {
  try {
    const { author } = payload
    const user = yield select(state => state.auth.get('user'))
    let { login_data } = user
    const { username, useKeychain } = user

    if(useKeychain) {
      login_data = username
    } else {
      login_data = extractLoginData(login_data)
      login_data = login_data[0]
    }

    const hasAuthority = author === login_data

    yield put(checkHasUpdateAuthoritySuccess(hasAuthority, meta))
  } catch (error) {
    yield put(checkHasUpdateAuthorityFailure(error, meta))
  }
}

function* signoutUserRequest(meta) {
  try {
    const user = { username: '', useKeychain: false, isAuthenticated: false }
    
    yield call([localStorage, localStorage.setItem], 'user', JSON.stringify([]))
    yield call([localStorage, localStorage.setItem], 'active', null)
    yield call([localStorage, localStorage.setItem], 'accounts', JSON.stringify([]))
    yield put(setAccountList([]))
    yield put(signoutUserSuccess(user, meta))
  } catch(error) {
    yield put(signoutUserFailure(error, meta))
  }
}

function* watchAuthenticationUserRequest({ payload, meta }) {
  yield call(authenticateUserRequest, payload, meta)
}

function* watchSignoutUserRequest({ meta }) {
  yield call(signoutUserRequest, meta)
}

function* watchCheckHasUpdateAuthorityRequest({ payload, meta }) {
  yield call(checkHasUpdateAuthorityRequest, payload, meta)
}

function* watchGetSavedUsersRequest({ meta }) {
  yield call(getSavedUserRequest, meta)
}

function* watchMuteUserRequest({ payload, meta }) {
  yield call(muteUserRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(CHECK_HAS_UPDATE_AUTHORITY_REQUEST, watchCheckHasUpdateAuthorityRequest)
  yield takeEvery(AUTHENTICATE_USER_REQUEST, watchAuthenticationUserRequest)
  yield takeEvery(GET_SAVED_USER_REQUEST, watchGetSavedUsersRequest)
  yield takeEvery(SIGNOUT_USER_REQUEST, watchSignoutUserRequest)
  yield takeEvery(MUTE_USER_REQUEST, watchMuteUserRequest)
}
