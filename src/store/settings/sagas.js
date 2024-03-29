import { call, put, takeEvery } from 'redux-saga/effects'

import {
  GET_BEST_RPC_NODE, 
  setRpcNode,

  CHECK_VERSION_REQUEST,
  checkVersionSuccess,

  GET_SAVED_THEME_REQUEST,
  getSavedThemeFailure,
  getSavedThemeSuccess,
  
  SET_THEME_REQUEST,
  setThemeSuccess,
  setThemeFailure,

} from './actions'

import {
  getBestRpcNode,
  checkVersion,
} from 'services/api'
import config from 'config'

function* getBestRPCNode(meta) {
  const node = yield call(getBestRpcNode)
  yield call([localStorage, localStorage.setItem], 'rpc', node)
  
  yield put(setRpcNode(node, meta))
}

function* checkVersionRequest(meta) {
  const remote = yield call(checkVersion)
  let running = yield call([localStorage, localStorage.getItem], 'version')
  let latest = false

  if (!running) {
    running = JSON.stringify(remote)
  } else {
    const { prod, dev } = JSON.parse(running)
    const { BRANCH } = config

    latest = (BRANCH === 'dev' && dev === remote.dev) || (BRANCH === 'prod' && prod === remote.prod)
  }

  if (!latest) {
    yield call([localStorage, localStorage.setItem], 'version', JSON.stringify(remote))
  }

  yield put(checkVersionSuccess(latest, meta))
}

function* getSavedThemeRequest(meta) {
  let theme = { mode: 'light' }
  try {
    let saved = yield call([localStorage, localStorage.getItem], 'theme')
    saved = JSON.parse(saved)
    if (saved !== null) {
      theme = saved
    }
    yield put(getSavedThemeSuccess(theme, meta))
  } catch (error) {
    yield put(getSavedThemeFailure(error, meta))
  }
}

function* setThemeRequest(payload, meta) {
  try {
    const { mode } = payload
    const theme = { mode }
    yield call([localStorage, localStorage.setItem], 'theme', JSON.stringify(theme))
    yield put(setThemeSuccess(theme, meta))
  } catch(error) {
    yield put(setThemeFailure(error, meta))
  }
}


function* watchGetBestRpcNode({ meta }) {
  yield call(getBestRPCNode, meta)
}

function* watchSetThemeRequest({ payload, meta }) {
  yield call(setThemeRequest, payload ,meta)
}

function* watchCheckVersionRequest({ meta }) {
  yield call(checkVersionRequest, meta)
}

function* watchGetSavedThemeRequest({ meta }) {
  yield call(getSavedThemeRequest, meta)
}

export default function* sagas() {
  yield takeEvery(GET_BEST_RPC_NODE, watchGetBestRpcNode)
  yield takeEvery(SET_THEME_REQUEST, watchSetThemeRequest)
  yield takeEvery(CHECK_VERSION_REQUEST, watchCheckVersionRequest)
  yield takeEvery(GET_SAVED_THEME_REQUEST, watchGetSavedThemeRequest)
}