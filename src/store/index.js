import { combineReducers } from 'redux'
import { fork, all } from 'redux-saga/effects'

import { auth } from './auth/reducers'
import { settings } from './settings/reducers'
import { posts } from './posts/reducers'
import { profile } from './profile/reducers'
import { interfaces } from './interfaces/reducers'
import { polling } from './polling/reducers'
import { reducer as thunkReducer } from 'redux-saga-thunk'
import * as authSagas from './auth/sagas'
import * as settingsSagas from './settings/sagas'
import * as postSagas from './posts/sagas'
import * as profileSagas from './profile/sagas'
import * as pollingSagas from './polling/sagas'

export const rootReducer = combineReducers({
  thunk: thunkReducer,
  auth,
  settings,
  posts,
  profile,
  interfaces,
  polling,
})
  
export function* rootSaga() {
  yield all([
    ...Object.values(authSagas),
    ...Object.values(settingsSagas),
    ...Object.values(postSagas),
    ...Object.values(profileSagas),
    ...Object.values(pollingSagas),
  ].map(fork))
}
