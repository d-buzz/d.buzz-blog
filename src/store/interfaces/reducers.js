import {
  CLEAR_SCROLL_INDEX,
} from './actions'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  scrollIndex: -1,
})

export const interfaces = (state = defaultState, { type, payload }) => {
  switch (type) {
  case CLEAR_SCROLL_INDEX:
    return state.set('scrollIndex', -1)
  default:
    return state
  }
}