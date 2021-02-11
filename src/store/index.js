import { combineReducers } from 'redux'
import { fork, all } from 'redux-saga/effects'

import { tests } from './tests/reducers'
import { auth } from './auth/reducers'
import { settings } from './settings/reducers'
import { posts } from './posts/reducers'
import { reducer as thunkReducer } from 'redux-saga-thunk'
import * as testSagas from './tests/sagas'
import * as authSagas from './auth/sagas'
import * as settingsSagas from './settings/sagas'
import * as postSagas from './posts/sagas'

export const rootReducer = combineReducers({
  thunk: thunkReducer,
  tests,
  auth,
  settings,
  posts,
})
  
export function* rootSaga() {
  yield all([
    ...Object.values(authSagas),
    ...Object.values(testSagas),
    ...Object.values(settingsSagas),
    ...Object.values(postSagas),
  ].map(fork))
}
