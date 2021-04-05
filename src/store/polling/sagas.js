import { put, call, takeEvery, takeLatest, select, race, delay } from 'redux-saga/effects'
import {
  POLL_NOTIF_REQUEST,
  pollNotifSuccess,
  pollNotifFailure,
  pollNotifCount,

  CLEAR_NOTIFICATIONS_REQUEST,
  clearNotificationsSuccess,
  clearNotificationsFailure,
} from './actions'
import {
  generateClearNotificationOperation,
  broadcastKeychainOperation,
  extractLoginData,
  broadcastOperation,
} from 'services/api'

function* clearNotificationRequest(meta) {
  try {
    const user = yield select(state => state.auth.get('user'))
    const notifications = yield select(state => state.polling.get('notifications'))
    const { username, useKeychain } = user
    const lastNotification = notifications[0]

    const operation = yield call(generateClearNotificationOperation, username, lastNotification)

    let success = false

    if(lastNotification.length !== 0) {
      if(useKeychain) {
        const result = yield call(broadcastKeychainOperation, username, operation)
        success = result.success
      } else {
        let { login_data } = user
        login_data = extractLoginData(login_data)

        const wif = login_data[1]
        const result = yield call(broadcastOperation, operation, [wif])
        success = result.success
      }

      let old = yield select(state => state.polling.get('count'))

      if(success) {
        old = {
          success: true,
          lastread: '',
          unread: 0,
        }
      } else {
        old.success = success
      }
      yield put(clearNotificationsSuccess(old, meta))
    } else {
      yield put(clearNotificationsFailure('failed to clear notification', meta))
    }
  } catch(error) {
    yield put(clearNotificationsFailure(error, meta))
  }
}

function* watchClearNotificationRequest({ meta }) {
  yield call(clearNotificationRequest, meta)
}

export default function* sagas() {
  yield takeEvery(CLEAR_NOTIFICATIONS_REQUEST, watchClearNotificationRequest)
}