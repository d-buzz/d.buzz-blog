import {
  CLEAR_ACCOUNT_POSTS,
  CLEAR_ACCOUNT_REPLIES,
} from './actions'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  posts: [],
  replies: [],
})

export const profile = (state = defaultState, { type, payload }) => {
  switch (type) {
  case CLEAR_ACCOUNT_POSTS:
    return state.set('posts', [])
  case CLEAR_ACCOUNT_REPLIES:
    return state.set('replies', [])
  default:
    return state
  }
}