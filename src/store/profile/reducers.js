import {
  GET_PROFILE_SUCCESS,
  GET_ACCOUNT_BLOG_SUCCESS,
  GET_ACCOUNT_POST_SUCCESS,
  GET_ACCOUNT_COMMENTS_SUCCESS,
  GET_ACCOUNT_REPLIES_SUCCESS,
  CLEAR_ACCOUNT_POSTS,
  CLEAR_ACCOUNT_REPLIES,
  SET_LAST_ACCOUNT_BLOG,
  SET_LAST_ACCOUNT_REPLY,
  SET_LAST_ACCOUNT_COMMENT,
  SET_LAST_ACCOUNT_POST,
} from './actions'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  profile: {},
  blog: [],
  replies: [],
  comments: [],
  last: [],
  lastReply: [],
  lastComment: [],
})

export const profile = (state = defaultState, { type, payload }) => {
  switch (type) {
  case GET_PROFILE_SUCCESS:
    return state.set('profile', payload)
  case GET_ACCOUNT_BLOG_SUCCESS:
    return state.set('blog', payload)
  case GET_ACCOUNT_POST_SUCCESS:
    return state.set('post', payload)
  case GET_ACCOUNT_COMMENTS_SUCCESS:
    return state.set('comments', payload)
  case GET_ACCOUNT_REPLIES_SUCCESS:
    return state.set('replies', payload)
  case CLEAR_ACCOUNT_POSTS:
    return state.set('blog', []) && state.set('post', [])
  case CLEAR_ACCOUNT_REPLIES:
    return state.set('replies', [])
  case SET_LAST_ACCOUNT_BLOG:
    return state.set('last', payload)
  case SET_LAST_ACCOUNT_POST:
    return state.set('last_post', payload)
  case SET_LAST_ACCOUNT_REPLY:
    return state.set('lastReply', payload)
  case SET_LAST_ACCOUNT_COMMENT:
    return state.set('lastComment', payload)  
  default:
    return state
  }
}