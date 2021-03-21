import {
  GET_PROFILE_SUCCESS,
  GET_ACCOUNT_POSTS_SUCCESS,
  GET_ACCOUNT_COMMENTS_SUCCESS,
  GET_ACCOUNT_REPLIES_SUCCESS,
  CLEAR_ACCOUNT_POSTS,
  CLEAR_ACCOUNT_REPLIES,
} from './actions'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  profile: {},
  posts: [],
  replies: [],
  comments: [],
})

export const profile = (state = defaultState, { type, payload }) => {
  switch (type) {
  case GET_PROFILE_SUCCESS:
    return state.set('profile', payload)
  case GET_ACCOUNT_POSTS_SUCCESS:
    return state.set('posts', payload)
  case GET_ACCOUNT_COMMENTS_SUCCESS:
    return state.set('comments', payload)
  case GET_ACCOUNT_REPLIES_SUCCESS:
    return state.set('replies', payload)
  case CLEAR_ACCOUNT_POSTS:
    return state.set('posts', [])
  case CLEAR_ACCOUNT_REPLIES:
    return state.set('replies', [])
  default:
    return state
  }
}