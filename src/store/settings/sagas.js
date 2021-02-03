import { call, put, takeEvery } from 'redux-saga/effects'

import {
  GET_BEST_RPC_NODE, 
  setRpcNode,

  CHECK_VERSION_REQUEST,
  checkVersionSuccess,
} from './actions'

import {
  getBestRpcNode,
  checkVersion,
} from 'services/api'
import config from 'config'

function* getBestRPCNode(meta) {
  const node = yield call(getBestRpcNode)
  console.log({ node })
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

function* watchGetBestRpcNode({ meta }) {
  yield call(getBestRPCNode, meta)
}

function* watchCheckVersionRequest({ meta }) {
  yield call(checkVersionRequest, meta)
}

export default function* sagas() {
  yield takeEvery(GET_BEST_RPC_NODE, watchGetBestRpcNode)
  yield takeEvery(CHECK_VERSION_REQUEST, watchCheckVersionRequest)
}