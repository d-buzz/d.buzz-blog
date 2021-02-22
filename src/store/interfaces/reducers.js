import {
  CLEAR_SCROLL_INDEX,
  SET_BUZZ_MODAL_STATUS,
} from './actions'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  scrollIndex: -1,
  buzzModalStatus: false,
})

export const interfaces = (state = defaultState, { type, payload }) => {
  switch (type) {
  case CLEAR_SCROLL_INDEX:
    return state.set('scrollIndex', -1)
  case SET_BUZZ_MODAL_STATUS:
    return state.set('buzzModalStatus', payload)
  default:
    return state
  }
}