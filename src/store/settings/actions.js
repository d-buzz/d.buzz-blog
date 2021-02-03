export const GET_BEST_RPC_NODE = 'GET_BEST_RPC_NODE'
export const SET_RPC_NODE = 'SET_RPC_NODE'

export const getBestRpcNode = () => ({
  type: GET_BEST_RPC_NODE,
  meta: {
    thunk: true,
  },
})

export const setRpcNode = (response, meta) => ({
  type: SET_RPC_NODE,
  payload: response,
  meta,
})

export const CHECK_VERSION_REQUEST = 'CHECK_VERSION_REQUEST'
export const CHECK_VERSION_SUCCESS = 'CHECK_VERSION_SUCCESS'

export const checkVersionRequest = () => ({
  type: CHECK_VERSION_REQUEST,
  meta: {
    thunk: true,
  },
})

export const checkVersionSuccess = (response, meta) => ({
  type: CHECK_VERSION_SUCCESS,
  payload: response,
  meta,
})