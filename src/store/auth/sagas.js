import { call, put, takeEvery, select } from 'redux-saga/effects'
import {
  AUTHENTICATE_USER_REQUEST,
  authenticateUserSuccess,
  authenticateUserFailure,
} from './actions'

import {
  keychainSignIn,
  fetchProfile,
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

  // const initialUsersLength = users.length

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

      }
    }
  } catch(e) {
    console.log(e)
  }


}



function* watchAuthenticationUserRequest({ payload, meta }) {
  yield call(authenticateUserRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(AUTHENTICATE_USER_REQUEST, watchAuthenticationUserRequest)
}
