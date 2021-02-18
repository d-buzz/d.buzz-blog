import { select, call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_TRENDING_TAGS_REQUEST,
  getTrendingTagsSuccess,
  getTrendingTagsFailure,

  GET_TRENDING_POSTS_REQUEST,
  getTrendingPostsSuccess,
  getTrendingPostsFailure,
  setTrendingLastPost,

  GET_LINK_META_REQUEST,
  getLinkMetaSuccess,
  getLinkMetaFailure,

  GET_HOME_POSTS_REQUEST,
  getHomePostsSuccess,
  getHomePostsFailure,
  setHomeLastPost,

  GET_LATEST_POSTS_REQUEST,
  getLatestPostsSuccess,
  getLatestPostsFailure,
  setLatestLastPost,

  setContentRedirect,

  GET_CONTENT_REQUEST,
  getContentSuccess,
  getContentFailure,

  GET_REPLIES_REQUEST,
  getRepliesSuccess,
  getRepliesFailure,
} from './actions'

import {
  callBridge,
  invokeMuteFilter,
  fetchTrendingTags,
  getLinkMeta,
  fetchContent,
  fetchDiscussions,
} from 'services/api'

function* getTrendingTagsRequests(meta) {
  try {
    let data = yield call(fetchTrendingTags)
    data = data.filter((tag) => !tag.name.includes('hive') && !tag.name.split('')[1].match(new RegExp('^\\d+$')))
    
    yield put(getTrendingTagsSuccess(data, meta))
  } catch (error) {
    yield put(getTrendingTagsFailure(error, meta))
  }
}

function* getTrendingPostsRequest(payload, meta) {
  const { start_permlink, start_author } = payload
  
  const params = { sort: 'trending', tag: '', start_permlink, start_author }
  const method = 'get_ranked_posts'
  
  try {
    const old = yield select(state => state.posts.get('trending'))
    let data = yield call(callBridge, method, params)
    
    data = [...old, ...data]
    
    data = data.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj['post_id']).indexOf(obj['post_id']) === pos
    })
    
    yield put(setTrendingLastPost(data[data.length-1]))
    
    const mutelist = yield select(state => state.auth.get('mutelist'))
    const opacityUsers = yield select(state => state.auth.get('opacityUsers'))
    data = invokeMuteFilter(data, mutelist, opacityUsers)
    
    yield put(getTrendingPostsSuccess(data, meta))
  } catch(error) {
    console.log({error})
    yield put(getTrendingPostsFailure(error, meta))
  }
}

function* getHomePostsRequest(payload, meta) {
  const { start_permlink, start_author } = payload
  const user = yield select(state => state.auth.get('user'))
  const { username: account } = user

  const params = {sort: 'feed', account, limit: 50, start_permlink, start_author }
  const method = 'get_account_posts'

  try {
    const old = yield select(state => state.posts.get('home'))
    let data = yield call(callBridge, method, params, false)

    data = [...old, ...data]

    data = data.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj['post_id']).indexOf(obj['post_id']) === pos
    })

    yield put(setHomeLastPost(data[data.length-1]))
    const mutelist = yield select(state => state.auth.get('mutelist'))

    const opacityUsers = yield select(state => state.auth.get('opacityUsers'))
    data = invokeMuteFilter(data, mutelist, opacityUsers)

    yield put(getHomePostsSuccess(data, meta))
  } catch(error) {
    yield put(getHomePostsFailure(error, meta))
  }
}

function* getLatestPostsRequest(payload, meta) {
  const { start_permlink, start_author } = payload

  const params = { sort: 'created', start_permlink, start_author }
  const method = 'get_ranked_posts'

  try {
    const old = yield select(state => state.posts.get('latest'))
    let data = yield call(callBridge, method, params)

    data = [...old, ...data]

    data = data.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj['post_id']).indexOf(obj['post_id']) === pos
    })

    yield put(setLatestLastPost(data[data.length-1]))

    const mutelist = yield select(state => state.auth.get('mutelist'))
    const opacityUsers = yield select(state => state.auth.get('opacityUsers'))
    data = invokeMuteFilter(data, mutelist, opacityUsers)


    yield put(getLatestPostsSuccess(data, meta))
  } catch(error) {
    yield put(getLatestPostsFailure(error, meta))
  }
}

function* getLinkMetaRequest(payload, meta) {
  try {
    const { url } = payload
    const data = yield call(getLinkMeta, url)

    yield put(getLinkMetaSuccess(data, meta))
    //
  } catch(error) {
    yield put(getLinkMetaFailure(error, meta))
  }
}

function* getContentRequest(payload, meta) {
  const { author, permlink } = payload
  console.log({payload})
  const contentRedirect = yield select(state => state.posts.get('contentRedirect'))

  try {
    let data = {}

    if(!contentRedirect) {
      const fromPage = yield select(state => state.posts.get('pageFrom'))
      if(!fromPage) {
        data = yield call(fetchContent, author, permlink)
      } else {

        if(fromPage === 'home') {
          const home = yield select(state => state.posts.get('home'))
          const filtered = home.filter((item) => item.author === author && item.permlink === permlink)
          data = filtered[0]
        } else if(fromPage === 'trending') {
          const trending = yield select(state => state.posts.get('trending'))
          const filtered = trending.filter((item) => item.author === author && item.permlink === permlink)
          data = filtered[0]
        } else if(fromPage === 'latest') {
          const latest = yield select(state => state.posts.get('latest'))
          const filtered = latest.filter((item) => item.author === author && item.permlink === permlink)
          data = filtered[0]
        } else if(fromPage === 'profile') {
          const profilePosts = yield select(state => state.profile.get('posts'))
          let filtered = profilePosts.filter((item) => item.author === author && item.permlink === permlink)

          if(filtered.length === 0) {
            const profileReplies = yield select(state => state.profile.get('replies'))
            filtered = profileReplies.filter((item) => item.author === author && item.permlink === permlink)
          }

          data = filtered[0]
        }
      }
    } else {
      data = contentRedirect
    }
    yield put(setContentRedirect(null))
    yield put(getContentSuccess(data, meta))
  } catch(error) {
    yield put(getContentFailure(error, meta))
  }
}

function* getRepliesRequest(payload, meta) {
  const { author, permlink } = payload
  try {
    const mutelist = yield select(state => state.auth.get('mutelist'))
    let replies = yield call(fetchDiscussions, author, permlink)
    replies = invokeMuteFilter(replies, mutelist)

    yield put(getRepliesSuccess(replies, meta))
  } catch(error) {
    yield put(getRepliesFailure(error, meta))
  }
}

function* watchGetLatestPostsRequest({payload, meta}) {
  yield call(getLatestPostsRequest, payload, meta)
}

function* watchGetTrendingTagsRequest({ meta }) {
  yield call(getTrendingTagsRequests, meta)
}

function* watchGetTrendingPostsRequest({ payload, meta }) {
  yield call(getTrendingPostsRequest, payload, meta)
}

function* watchGetLinkMetaRequest({ payload, meta }) {
  yield call(getLinkMetaRequest, payload, meta)
}

function* watchGetHomePostsRequest({ payload, meta }) {
  yield call(getHomePostsRequest, payload, meta)
}

function* watchGetContentRequest({ payload, meta }) {
  yield call(getContentRequest, payload, meta)
}

function* watchGetRepliesRequest({ payload, meta }) {
  yield call(getRepliesRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(GET_LATEST_POSTS_REQUEST, watchGetLatestPostsRequest)
  yield takeEvery(GET_TRENDING_TAGS_REQUEST, watchGetTrendingTagsRequest)
  yield takeEvery(GET_TRENDING_POSTS_REQUEST, watchGetTrendingPostsRequest)
  yield takeEvery(GET_LINK_META_REQUEST, watchGetLinkMetaRequest)
  yield takeEvery(GET_HOME_POSTS_REQUEST, watchGetHomePostsRequest)
  yield takeEvery(GET_CONTENT_REQUEST, watchGetContentRequest)
  yield takeEvery(GET_REPLIES_REQUEST, watchGetRepliesRequest)
}