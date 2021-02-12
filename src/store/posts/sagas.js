import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_TRENDING_TAGS_REQUEST,
  getTrendingTagsSuccess,
  getTrendingTagsFailure,
} from './actions'

import {
  fetchTrendingTags,
} from 'services/api'

function* getTrendingTagsRequests(meta) {
  try {
    let data = yield call(fetchTrendingTags)
    console.log({data})
    data = data.filter((tag) => !tag.name.includes('hive') && !tag.name.split('')[1].match(new RegExp('^\\d+$')))
    console.log({data})
    yield put(getTrendingTagsSuccess(data, meta))
  } catch (error) {
    yield put(getTrendingTagsFailure(error, meta))
  }
}

function* watchGetTrendingTagsRequest({ meta }) {
  yield call(getTrendingTagsRequests, meta)
}

export default function* sagas() {
  yield takeEvery(GET_TRENDING_TAGS_REQUEST, watchGetTrendingTagsRequest)
}