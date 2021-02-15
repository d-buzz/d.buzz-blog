import {
  GET_TRENDING_TAGS_SUCCESS,
  GET_TRENDING_POSTS_SUCCESS,
  SET_TRENDING_LAST_POST,
  SET_PAGE_FROM,
  SET_HOME_IS_VISITED,
  SET_TRENDING_IS_VISITED,
  SET_LATEST_IS_VISITED,
  SET_TAGS_IS_VISITED,
  CLEAR_SEARCH_POSTS,
  CLEAR_LAST_SEARCH_TAG,
  CLEAR_TRENDING_POSTS,
  CLEAR_LATEST_POSTS,
  CLEAR_TAGS_POST,
  CLEAR_HOME_POSTS,
  CLEAR_APPEND_REPLY,
  CLEAR_REPLIES,
} from './actions'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  tags: [],
  search: {},
  searchTag: [],
  trending: [],
  lastTrending: {},
  tagPost: [],
  home: [],
  isHomeVisited: false,
  isTrendingVisited: false,
  isLatestVisited: false,
  isTagsVisited: false,
  appendReply: {},
  replies: [],
  pageFrom: '',
})

export const posts = (state = defaultState, { type, payload }) => {
  switch (type) {
  case GET_TRENDING_TAGS_SUCCESS:
    return state.set('tags', payload)
  case GET_TRENDING_POSTS_SUCCESS:
    return state.set('trending', payload)
  case SET_TRENDING_LAST_POST:
    return state.set('lastTrending', payload)
  case SET_PAGE_FROM:
    return state.set('pageFrom', payload)
  case CLEAR_SEARCH_POSTS:
    return state.set('search', {})
  case CLEAR_LAST_SEARCH_TAG:
    return state.set('searchTag', [])
  case CLEAR_TRENDING_POSTS:
    return state.set('trending', [])
  case CLEAR_LATEST_POSTS:
    return state.set('latest', [])
  case CLEAR_TAGS_POST:
    return state.set('tagPost', [])
  case CLEAR_HOME_POSTS:
    return state.set('home', [])
  case SET_HOME_IS_VISITED:
    return state.set('isHomeVisited', payload)
  case SET_TRENDING_IS_VISITED:
    return state.set('isTrendingVisited', payload)
  case SET_LATEST_IS_VISITED:
    return state.set('isLatestVisited', payload)
  case SET_TAGS_IS_VISITED: 
    return state.set('isTagsVisited', payload)
  case CLEAR_APPEND_REPLY:
    return state.set('appendReply', {})
  case CLEAR_REPLIES:
    return state.set('replies', [])
  default:
    return state
  }
}