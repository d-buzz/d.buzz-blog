import { call, put, select, takeEvery } from 'redux-saga/effects'
import {
  GET_PROFILE_REQUEST,
  getProfileSuccess,
  getProfileFailure,

  GET_ACCOUNT_POSTS_REQUEST,
  getAccountPostsSuccess,
  getAccountPostsFailure,
  setLastAccountPosts,

  GET_ACCOUNT_REPLIES_REQUEST,
  getAccountRepliesSuccess,
  getAccountRepliesFailure,
  setLastAccountReply,
} from './actions'

import {
  fetchGlobalProperties,
  fetchSingleProfile,
  fetchAccounts,
  fetchAccountPosts,
} from 'services/api'

function* getProfileRequest(payload, meta) {
  try {
    const { username } = payload
    const props = yield call(fetchGlobalProperties)
    const profile = yield call(fetchSingleProfile, username)
    const account = yield call(fetchAccounts, username)

    const { vesting_shares, to_withdraw, withdrawn, delegated_vesting_shares, received_vesting_shares } = account[0]
    const { total_vesting_fund_hive, total_vesting_shares } = props

    const delegated = parseFloat(parseFloat(total_vesting_fund_hive) * (parseFloat(delegated_vesting_shares) / parseFloat(total_vesting_shares)),6)
    const receiveVesting = parseFloat(parseFloat(total_vesting_fund_hive) * (parseFloat(received_vesting_shares) / parseFloat(total_vesting_shares)),6)
    const avail = parseFloat(vesting_shares) - (parseFloat(to_withdraw) - parseFloat(withdrawn)) / 1e6 - parseFloat(delegated_vesting_shares)
    const vestHive = parseFloat(parseFloat(total_vesting_fund_hive) * (parseFloat(avail) / parseFloat(total_vesting_shares)),6)

    profile.receiveVesting = receiveVesting.toFixed(2)
    profile.hivepower = parseFloat(vestHive.toFixed(2)) + parseFloat(profile.receiveVesting)
    profile.delegated = delegated.toFixed(2)

    yield put(getProfileSuccess(profile, meta))
  } catch(error) {
    yield put(getProfileFailure(error, meta))
  }
}

function* getAccountPostRequest(payload, meta) {
  try{
    const { username, start_permlink, start_author } = payload
    const old = yield select(state => state.profile.get('posts'))
    let data = yield call(fetchAccountPosts, username, start_permlink, start_author)

    data = [...old, ...data]
    data = data.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj['post_id']).indexOf(obj['post_id']) === pos
    })

    yield put(setLastAccountPosts(data[data.length-1]))
    yield put(getAccountPostsSuccess(data, meta))
  } catch(error) {
    yield put(getAccountPostsFailure(error, meta))
  }
}

function* getAccountRepliesRequest(payload, meta) {
  try {
    const { username, start_permlink, start_author } = payload
    const old = yield select(state => state.profile.get('replies'))
    let data = yield call(fetchAccountPosts, username, start_permlink, start_author, 'replies')

    data = [...old, ...data]
    data = data.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj['post_id']).indexOf(obj['post_id']) === pos
    })

    yield put(setLastAccountReply(data[data.length-1]))
    yield put(getAccountRepliesSuccess(data, meta))
  } catch(error) {
    yield put(getAccountRepliesFailure(error, meta))
  }
}


function* watchGetProfileRequest({ payload, meta }) {
  yield call(getProfileRequest, payload, meta)
}

function* watchGetAccountPostRequest({ payload, meta }) {
  yield call(getAccountPostRequest, payload, meta)
}

function* watchGetAccountRepliesRequest({ payload, meta }) {
  yield call(getAccountRepliesRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(GET_PROFILE_REQUEST, watchGetProfileRequest)
  yield takeEvery(GET_ACCOUNT_POSTS_REQUEST, watchGetAccountPostRequest)
  yield takeEvery(GET_ACCOUNT_REPLIES_REQUEST, watchGetAccountRepliesRequest)
}