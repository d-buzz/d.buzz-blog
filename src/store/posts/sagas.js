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

  UPLOAD_FILE_REQUEST,
  uploadFileSuccess,
  uploadFileError,

  PUBLISH_POST_REQUEST,
  publishPostSuccess,
  publishPostFailure,

  FOLLOW_REQUEST,
  followSuccess,
  followFailure,
  setHasBeenFollowedRecently,

  UNFOLLOW_REQUEST,
  unfollowSuccess,
  unfollowFailure,
  setHasBeenUnfollowedRecently,

  GET_FOLLOW_DETAILS_REQUEST,
  getFollowDetailsSuccess,
  getFollowDetailsFailure,

  PUBLISH_UPDATE_REQUEST,
  publishUpdateSuccess,
  publishUpdateFailure,

  UPVOTE_REQUEST,
  upvoteSuccess,
  upvoteFailure,

  saveReceptUpvotes,
} from './actions'

import {
  callBridge,
  invokeMuteFilter,
  fetchTrendingTags,
  getLinkMeta,
  fetchContent,
  fetchDiscussions,
  uploadIpfsImage,
  broadcastKeychainOperation,
  broadcastOperation,
  generatePostOperations,
  extractLoginData,
  generateFollowOperation,
  generateUnfollowOperation,
  isFollowing,
  fetchFollowCount,
  generateUpdateOperation,
  keychainUpvote,
  broadcastVote,
} from 'services/api'
import { createPatch, errorMessageComposer } from 'services/helper'
import moment from 'moment'

const footnote = (body) => {
  const footnoteAppend = '<br /><br /> Posted via <a href="https://blog.d.buzz" data-link="promote-link">D.Buzz Blog</a>'
  body = `${body} ${footnoteAppend}`

  return body
}

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

function* fileUploadRequest(payload, meta) {
  try {
    const user = yield select(state => state.auth.get('user'))
    const old = yield select(state => state.posts.get('images'))
    const { isAuthenticated } = user
    const { file } = payload

    if(isAuthenticated) {

      const result = yield call(uploadIpfsImage, file)

      let images = []

      if(Array.isArray(old) && old.length !== 0) {
        images = [ ...old ]
      }

      const ipfsHash = result.hashV0
      const postUrl = `https://ipfs.io/ipfs/${ipfsHash}`
      images.push(postUrl)

      yield put(uploadFileSuccess(images, meta))
    } else {
      yield put(uploadFileError('authentication required', meta))
    }
  } catch (error) {
    yield put(uploadFileError(error, meta))
  }
}

function* publishPostRequest(payload, meta) {
  try {
    const { title, tags, payout } = payload
    let { body } = payload

    body = footnote(body)


    const user = yield select(state => state.auth.get('user'))
    const { username, useKeychain } = user
    console.log({user})

    try {
      const operations = yield call(generatePostOperations, username, title, body, tags, payout)
      console.log({operations})
      console.log('done operations')
   

    let success = false
    const comment_options = operations[1]
    const permlink = comment_options[1].permlink
    console.log({permlink})

    console.log({useKeychain})

    if(useKeychain) {
      console.log('in')
      const result = yield call(broadcastKeychainOperation, username, operations)
      success = result.success
      console.log('success')
      console.log({success})

      if(!success) {
        yield put(publishPostFailure('Unable to publish post', meta))
      }
    } else if (!useKeychain) {
      let { login_data } = user
      login_data = extractLoginData(login_data)
      console.log({login_data})

      const wif = login_data[1]
      const result = yield call(broadcastOperation, operations, [wif])

      success = result.success
    }
    

    if(success) {
      const comment = operations[0]
      const json_metadata = comment[1].json_metadata

      let currentDatetime = moment().toISOString()
      currentDatetime = currentDatetime.replace('Z', '')

      let cashout_time = moment().add(7, 'days').toISOString()
      cashout_time = cashout_time.replace('Z', '')

      let body = comment[1].body
      body = body.replace('<br /><br /> Posted via <a href="https://blog.d.buzz" data-link="promote-link">D.Buzz Blog</a>', '')


      const content = {
        author: username,
        category: '',
        permlink,
        title: comment[1].title,
        body: body,
        replies: [],
        total_payout_value: '0.000 HBD',
        curator_payout_value: '0.000 HBD',
        pending_payout_value: '0.000 HBD',
        active_votes: [],
        root_author: "",
        parent_author: null,
        parent_permlink: "",
        root_permlink: permlink,
        root_title: title,
        json_metadata,
        children: 0,
        created: currentDatetime,
        cashout_time,
        max_accepted_payout: `${payout.toFixed(3)} HBD`,
      }

      yield put(setContentRedirect(content))
    }

    const data = {
      success,
      author: username,
      permlink,
    }
    
    yield put(publishPostSuccess(data, meta))
  } catch(e) { console.log(e)}

  } catch (error) {
    const errorMessage = errorMessageComposer('post', error)
    yield put(publishPostFailure({ errorMessage }, meta))
  }
}

function* followRequest(payload, meta) {
  try {
    const { following } = payload
    const user = yield select(state => state.auth.get('user'))
    const { username, useKeychain } = user

    const operation = yield call(generateFollowOperation, username, following)
    let success = false


    if(useKeychain) {
      const result = yield call(broadcastKeychainOperation, username, operation)
      success = result.success
    } else {
      let { login_data } = user
      login_data = extractLoginData(login_data)

      const wif = login_data[1]
      const result = yield call(broadcastOperation, operation, [wif])
      success = result.success
    }

    if(success) {
      let recentFollows = yield select(state => state.posts.get('hasBeenRecentlyFollowed'))
      let recentUnfollows = yield select(state => state.posts.get('hasBeenRecentlyUnfollowed'))

      if(!Array.isArray(recentUnfollows)) {
        recentUnfollows = []
      } else {
        const index = recentUnfollows.findIndex((item) => item === following)
        if(index) {
          recentUnfollows.splice(index, 1)
        }
      }

      if(!Array.isArray(recentFollows)) {
        recentFollows = []
      }
      recentFollows.push(following)
      yield put(setHasBeenFollowedRecently(recentFollows))
      yield put(setHasBeenUnfollowedRecently(recentUnfollows))
    }

    yield put(followSuccess(success, meta))
  } catch (error) {
    yield put(followFailure(error, meta))
  }
}

function* unfollowRequest(payload, meta) {
  try {
    const { following } = payload
    const user = yield select(state => state.auth.get('user'))
    const { username, useKeychain } = user

    const operation = yield call(generateUnfollowOperation, username, following)
    let success = false


    if(useKeychain) {
      const result = yield call(broadcastKeychainOperation, username, operation)
      success = result.success
    } else {
      let { login_data } = user
      login_data = extractLoginData(login_data)

      const wif = login_data[1]
      const result = yield call(broadcastOperation, operation, [wif])
      success = result.success
    }

    if(success) {
      let recentFollows = yield select(state => state.posts.get('hasBeenRecentlyFollowed'))
      let recentUnfollows = yield select(state => state.posts.get('hasBeenRecentlyUnfollowed'))

      if(!Array.isArray(recentFollows)) {
        recentFollows = []
      } else {
        const index = recentFollows.findIndex((item) => item === following)
        if(index) {
          recentFollows.splice(index, 1)
        }
      }

      if(!Array.isArray(recentUnfollows)) {
        recentUnfollows = []
      }
      recentUnfollows.push(following)

      yield put(setHasBeenFollowedRecently(recentFollows))
      yield put(setHasBeenUnfollowedRecently(recentUnfollows))
    }

    yield put(unfollowSuccess(success, meta))
  } catch(error) {
    yield put(unfollowFailure(error, meta))
  }
}

function* getFollowDetailsRequest(payload, meta) {
  try {
    const { name } = payload
    const user = yield select(state => state.auth.get('user'))
    const { isAuthenticated, username } = user
    const count = yield call(fetchFollowCount, name)

    let isFollowed = false

    if(isAuthenticated) {
      isFollowed = yield call(isFollowing, username, name)
    }

    yield put(getFollowDetailsSuccess({ isFollowed, count }, meta))
  } catch(error) {
    yield put(getFollowDetailsFailure(error, meta))
  }
}

function* publishUpdateRequest(payload, meta) {
  try {
    const { permlink, body: altered  } = payload

    const user = yield select(state => state.auth.get('user'))
    const { username, useKeychain } = user

    const original = yield call(fetchContent, username, permlink)
    const {
      parent_author,
      parent_permlink,
      author,
      title,
      body,
      json_metadata,
    } = original

    const patch = createPatch(body.trim(), altered.trim())
    const operation = yield call(generateUpdateOperation, parent_author, parent_permlink, author, permlink, title, patch, json_metadata)

    let success = false
    if(useKeychain) {
      const result = yield call(broadcastKeychainOperation, username, operation)
      success = result.success
    } else {
      let { login_data } = user
      login_data = extractLoginData(login_data)

      const wif = login_data[1]
      const result = yield call(broadcastOperation, operation, [wif])
      success = result.success
    }

    yield put(publishUpdateSuccess(success, meta))

  } catch(error) {
    yield put(publishUpdateFailure(error, meta))
  }
}

function* upvoteRequest(payload, meta) {
  try {
    const { author, permlink, percentage } = payload
    const user = yield select(state => state.auth.get('user'))
    const { username, isAuthenticated, useKeychain } = user
    let recentUpvotes = yield select(state => state.posts.get('recentUpvotes'))

    const weight = percentage * 100

    if(isAuthenticated) {
      if(useKeychain) {

        const result = yield call(keychainUpvote, username, permlink, author, weight)
        if(result.success) {
          recentUpvotes = [...recentUpvotes, permlink]
          yield put(upvoteSuccess({ success: true }, meta))
        }

      } else {

        let { login_data } = user
        login_data = extractLoginData(login_data)
        const wif = login_data[1]

        yield call(broadcastVote, wif, username, author, permlink, weight)
        recentUpvotes = [...recentUpvotes, permlink]
        yield put(upvoteSuccess({ success: true }, meta))

      }

      yield put(saveReceptUpvotes(recentUpvotes))

    } else {
      yield put(upvoteFailure({ success: false, errorMessage: 'No authentication' }, meta))
    }

  } catch(error) {
    const errorMessage = errorMessageComposer('upvote', error)
    yield put(upvoteFailure({ success: false, errorMessage }, meta))
  }
}

function* watchUpvoteRequest({ payload, meta }) {
  yield call(upvoteRequest, payload, meta)
}

function* watchGetFollowDetailsRequest({ payload, meta }) {
  yield call(getFollowDetailsRequest, payload, meta)
}

function* watchPublishUpdateRequest({ payload, meta }) {
  yield call(publishUpdateRequest, payload, meta)
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

function* watchUploadFileUploadRequest({ payload, meta }) {
  yield call(fileUploadRequest, payload, meta)
}

function* watchPublishPostRequest({ payload, meta }) {
  yield call(publishPostRequest, payload, meta)
}

function* watchFollowRequest({ payload, meta }) {
  yield call(followRequest, payload, meta)
}

function* watchUnfollowRequest({ payload, meta }) {
  yield call(unfollowRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(GET_LATEST_POSTS_REQUEST, watchGetLatestPostsRequest)
  yield takeEvery(GET_TRENDING_TAGS_REQUEST, watchGetTrendingTagsRequest)
  yield takeEvery(GET_TRENDING_POSTS_REQUEST, watchGetTrendingPostsRequest)
  yield takeEvery(GET_FOLLOW_DETAILS_REQUEST, watchGetFollowDetailsRequest)
  yield takeEvery(PUBLISH_UPDATE_REQUEST, watchPublishUpdateRequest)
  yield takeEvery(GET_LINK_META_REQUEST, watchGetLinkMetaRequest)
  yield takeEvery(GET_HOME_POSTS_REQUEST, watchGetHomePostsRequest)
  yield takeEvery(GET_CONTENT_REQUEST, watchGetContentRequest)
  yield takeEvery(GET_REPLIES_REQUEST, watchGetRepliesRequest)
  yield takeEvery(UPLOAD_FILE_REQUEST, watchUploadFileUploadRequest)
  yield takeEvery(PUBLISH_POST_REQUEST, watchPublishPostRequest)
  yield takeEvery(FOLLOW_REQUEST, watchFollowRequest)
  yield takeEvery(UNFOLLOW_REQUEST, watchUnfollowRequest)
  yield takeEvery(UPVOTE_REQUEST, watchUpvoteRequest)
}