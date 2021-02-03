import {
  SET_RPC_NODE,
} from './actions'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  rpcNode: 'https://api.hive.blog'
})

export const settings = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_RPC_NODE:
      return state.set('rpcNode', payload)
    default:
      return state
  }
}