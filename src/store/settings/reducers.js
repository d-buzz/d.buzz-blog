import {
  SET_RPC_NODE,
  GET_SAVED_THEME_SUCCESS,
  GENERATE_STYLES,
} from './actions'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  theme: {},
  themeStyles: {},
  rpcNode: 'https://api.hive.blog',
})

export const settings = (state = defaultState, { type, payload }) => {
  switch (type) {
  case SET_RPC_NODE:
    return state.set('rpcNode', payload)
  case GET_SAVED_THEME_SUCCESS:
    return state.set('theme', payload)
  case GENERATE_STYLES:
    return state.set('themeStyles', payload)
  default:
    return state
  }
}