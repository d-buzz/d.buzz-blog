import { call, put, select, takeEvery } from 'redux-saga/effects'
import {
  GET_PROFILE_REQUEST,
  getProfileSuccess,
  getProfileFailure,

  GET_ACCOUNT_BLOG_REQUEST,
  getAccountBlogSuccess,
  getAccountBlogFailure,
  setLastAccountBlog,

  GET_ACCOUNT_REPLIES_REQUEST,
  getAccountRepliesSuccess,
  getAccountRepliesFailure,
  setLastAccountReply,

  GET_ACCOUNT_COMMENTS_REQUEST,
  getAccountCommentsFailure,
  getAccountCommentsSucess,
  setLastAccountComment,
} from './actions'

import {
  fetchGlobalProperties,
  fetchSingleProfile,
  fetchAccounts,
  fetchAccountBlog,
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
    console.log(error)
    yield put(getProfileFailure(error, meta))
  }
}

function* getAccountBlogRequest(payload, meta) {
  try{
    const { username, start_permlink, start_author } = payload
    const old = yield select(state => state.profile.get('blog'))
    let data = yield call(fetchAccountBlog, username, start_permlink, start_author)

    data = [...old, ...data]
    data = data.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj['post_id']).indexOf(obj['post_id']) === pos
    })
    
    yield put(setLastAccountBlog(data[data.length-1]))
    yield put(getAccountBlogSuccess(data, meta))
  } catch(error) {
    yield put(getAccountBlogFailure(error, meta))
  }
}

function* getAccountRepliesRequest(payload, meta) {
  try {
    const { username, start_permlink, start_author } = payload
    const old = yield select(state => state.profile.get('replies'))
    let data = yield call(fetchAccountBlog, username, start_permlink, start_author, 'replies')

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

function* getCommentsAccountRequest(payload, meta) {
  try {
    const { username, start_permlink, start_author } = payload
    const old = yield select(state => state.profile.get('comments'))
    let data = yield call(fetchAccountBlog, username, start_permlink, start_author, 'comments')

    data = [...old, ...data]
    data = data.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj['post_id']).indexOf(obj['post_id']) === pos
    })

    yield put(setLastAccountComment(data[data.length-1]))
    yield put(getAccountCommentsSucess(data, meta))
  } catch (error) {
    yield put(getAccountCommentsFailure(error, meta))
  }
}


function* watchGetProfileRequest({ payload, meta }) {
  yield call(getProfileRequest, payload, meta)
}

function* watchGetAccountBlogRequest({ payload, meta }) {
  yield call(getAccountBlogRequest, payload, meta)
}

function* watchGetAccountRepliesRequest({ payload, meta }) {
  yield call(getAccountRepliesRequest, payload, meta)
}

function* watchGetAccountCommentsRequest({ payload, meta }) {
  yield call(getCommentsAccountRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(GET_PROFILE_REQUEST, watchGetProfileRequest)
  yield takeEvery(GET_ACCOUNT_BLOG_REQUEST, watchGetAccountBlogRequest)
  yield takeEvery(GET_ACCOUNT_REPLIES_REQUEST, watchGetAccountRepliesRequest)
  yield takeEvery(GET_ACCOUNT_COMMENTS_REQUEST, watchGetAccountCommentsRequest)
}