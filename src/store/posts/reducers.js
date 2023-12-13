import {
  GET_CONTENT_SUCCESS,
  GET_HOME_POSTS_SUCCESS,
  GET_LATEST_POSTS_SUCCESS,
  GET_NEWS_POSTS_SUCCESS,
  GET_HIVE_POSTS_SUCCESS,
  GET_TRENDING_TAGS_SUCCESS,
  GET_TRENDING_POSTS_SUCCESS,
  SET_TRENDING_LAST_POST,
  GET_REPLIES_SUCCESS,
  SET_PAGE_FROM,
  SET_HOME_IS_VISITED,
  SET_HOME_LAST_POST,
  SET_TRENDING_IS_VISITED,
  SET_LATEST_IS_VISITED,
  SET_NEWS_IS_VISITED,
  SET_HIVE_IS_VISITED,
  SET_LATEST_LAST_POST,
  SET_NEWS_LAST_POST,
  SET_TAGS_IS_VISITED,
  CLEAR_SEARCH_POSTS,
  CLEAR_LAST_SEARCH_TAG,
  CLEAR_TRENDING_POSTS,
  CLEAR_LATEST_POSTS,
  CLEAR_TAGS_POST,
  CLEAR_HOME_POSTS,
  CLEAR_APPEND_REPLY,
  CLEAR_REPLIES,
  CLEAR_CONTENT,
  SET_CONTENT_REDIRECT,
  UNSET_CONTENT_REDIRECT,
  UPLOAD_FILE_SUCCESS,
  PUBLISH_POST_SUCCESS,
  SAVE_RECENT_UPVOTES,
  GET_SEARCH_TAG_SUCCESS,
  SEARCH_SUCCESS,
  PUBLISH_REPLY_SUCCESS,
  SUCCESS_POST_REQUEST,
} from './actions'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  tags: [],
  latest: [],
  news: [],
  hive: [],
  content: {},
  search: {},
  searchTag: [],
  trending: [],
  lastTrending: {},
  lastHome: {},
  tagPost: [],
  home: [],
  lastLatest: {},
  lastNews: {},
  lastHive: {},
  isHomeVisited: false,
  isTrendingVisited: false,
  isLatestVisited: false,
  isTagsVisited: false,
  isNewsVisited: false,
  isHiveVisited: false,
  appendReply: {},
  replies: [],
  pageFrom: '',
  images: [],
  recentUpvotes: [],
  published: {},
  postContent:{},
})

export const posts = (state = defaultState, { type, payload }) => {
  switch (type) {
  case SUCCESS_POST_REQUEST:
    return state.set('postContent', payload)
  case PUBLISH_REPLY_SUCCESS:
    return state.set('appendReply', payload.reply)
  case SET_LATEST_LAST_POST:
    return state.set('lastLatest', payload)
  case SET_NEWS_LAST_POST:
    return state.set('lastNews', payload)
  case GET_HOME_POSTS_SUCCESS:
    return state.set('home', payload)
  case GET_LATEST_POSTS_SUCCESS:
    return state.set('latest', payload)
  case GET_NEWS_POSTS_SUCCESS:
    return state.set('news', payload)
  case GET_HIVE_POSTS_SUCCESS:
    return state.set('hive', payload)
  case GET_TRENDING_TAGS_SUCCESS:
    return state.set('tags', payload)
  case GET_TRENDING_POSTS_SUCCESS:
    return state.set('trending', payload)
  case SET_TRENDING_LAST_POST:
    return state.set('lastTrending', payload)
  case GET_REPLIES_SUCCESS:
    return state.set('replies', payload)
  case SET_PAGE_FROM:
    return state.set('pageFrom', payload)
  case GET_CONTENT_SUCCESS:
    return state.set('content', payload)
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
  case SET_HOME_LAST_POST:
    return state.set('lastHome', payload)
  case SET_TRENDING_IS_VISITED:
    return state.set('isTrendingVisited', payload)
  case SET_LATEST_IS_VISITED:
    return state.set('isLatestVisited', payload)
  case SET_NEWS_IS_VISITED:
    return state.set('isNewsVisited', payload)
  case SET_HIVE_IS_VISITED:
    return state.set('isHiveVisited', payload)
  case SET_TAGS_IS_VISITED: 
    return state.set('isTagsVisited', payload)
  case CLEAR_APPEND_REPLY:
    return state.set('appendReply', {})
  case CLEAR_REPLIES:
    return state.set('replies', [])
  case CLEAR_CONTENT:
    return state.set('content', {})
  case SET_CONTENT_REDIRECT:
    return state.set('contentRedirect', payload)
  case UNSET_CONTENT_REDIRECT:
    return state.set('contentRedirect', null)
  case UPLOAD_FILE_SUCCESS:
    return state.set('images', payload)
  case PUBLISH_POST_SUCCESS:
    return state.set('published', payload)
  case SAVE_RECENT_UPVOTES:
    return state.set('recentUpvotes', payload)
  case GET_SEARCH_TAG_SUCCESS:
    return state.set('searchTag', payload)
  case SEARCH_SUCCESS:
    return state.set('search', payload)
  default:
    return state
  }
}