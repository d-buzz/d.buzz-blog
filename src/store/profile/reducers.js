import {
  GET_PROFILE_SUCCESS,
  GET_ACCOUNT_POSTS_SUCCESS,
  CLEAR_ACCOUNT_POSTS,
  CLEAR_ACCOUNT_REPLIES,
} from './actions'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  profile: {},
  posts: [],
  replies: [],
})

export const profile = (state = defaultState, { type, payload }) => {
  switch (type) {
  case GET_PROFILE_SUCCESS:
    return state.set('profile', payload)
  case GET_ACCOUNT_POSTS_SUCCESS:
    return state.set('posts', payload)
  case CLEAR_ACCOUNT_POSTS:
    return state.set('posts', [])
  case CLEAR_ACCOUNT_REPLIES:
    return state.set('replies', [])
  default:
    return state
  }
}