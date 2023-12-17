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

  GET_NEWS_POSTS_REQUEST,
  getNewsPostsSuccess,
  getNewsPostsFailure,
  setNewsLastPost,

  GET_HIVE_POSTS_REQUEST,
  getHivePostsSuccess,
  getHivePostsFailure,
  setHiveLastPost,

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

  PUBLISH_REPLY_REQUEST,
  publishReplySuccess,
  publishReplyFailure,

  GET_SEARCH_TAG_REQUEST,
  getSearchTagsSuccess,
  getSearchTagFailure,

  SEARCH_REQUEST,
  searchSuccess,
  searchFailure,

  SET_POST_REQUEST,
  successPostSuccess,
} from './actions'

import {
  callBridge,
  invokeMuteFilter,
  fetchTrendingTags,
  getLinkMeta,
  fetchContent,
  fetchDiscussions,
  // uploadIpfsImage,
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
  generateReplyOperation,
  searchPostTags,
  searchPostAuthor,
  searchPostGeneral,
  searchPeople,
  getMutePattern,
  invokeFilter,
  uploadImage,
} from '../../services/api'

import {
  checkCeramicLogin,
  getFollowingFeed,
} from "services/ceramic"
import { createPatch, errorMessageComposer,stripHtml } from 'services/helper'
import moment from 'moment'

function patternMute(patterns, data) {
  return data.filter((item) => !patterns.includes(`${item.body}`.trim()))
}

const footnote = (body) => {
  const footnoteAppend = '<br /><br /> Posted via <a href="https://blog.d.buzz" data-link="promote-link">Blog D.Buzz</a>'
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

const invokeHideBuzzFilter = (items) => {
  let hiddenBuzzes = localStorage.getItem('hiddenBuzzes')

  if (!hiddenBuzzes) {
    hiddenBuzzes = []
  } else {
    hiddenBuzzes = JSON.parse(hiddenBuzzes)
  }

  return items.filter((item) => hiddenBuzzes.filter((hidden) => hidden.author === item.author && hidden.permlink === item.permlink).length === 0)
}

// const censorCheck = (content, censoredList) => {
//   const copyContent = content

//   const result = censoredList.filter(({
//     author,
//     permlink,
//   }) => `${author}/${permlink}` === `${content.author}/${content.permlink}`)

//   copyContent.censored = {status: false, reason: null}

//   if (result.length !== 0) {
//     copyContent.body = censorLinks(copyContent.body)
//     copyContent.censored = {status: true, reason: result[0].type}
//   }

//   return copyContent
// }

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
    data = data.filter(item => invokeFilter(item))
    
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
  // const censoredList = yield select(state => state.auth.get('censorList'))
  const { start_permlink, start_author } = payload
  const user = yield select(state => state.auth.get('user'))
  const { username: account } = user

  const params = {sort: 'feed', account, limit: 50, start_permlink, start_author }
  const method = 'get_account_posts'

  try {
    if (!checkCeramicLogin(account)) {
      const old = yield select(state => state.posts.get('home'))
      let data = yield call(callBridge, method, params, false)

      data = [...old, ...data]

      data = data.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj['post_id']).indexOf(obj['post_id']) === pos
      })
      
      yield put(setHomeLastPost(data[data.length - 1]))
      const mutelist = yield select(state => state.auth.get('mutelist'))
      data = data.filter(item => invokeFilter(item))

      const opacityUsers = yield select(state => state.auth.get('opacityUsers'))

      data = invokeMuteFilter(data, mutelist, opacityUsers)

      data = invokeHideBuzzFilter(data)


      // having some issue in te censorCheck
      // data.map((item) => censorCheck(item, censoredList))
      // console.log('data.map((item) => censorCheck',data)

      yield put(getHomePostsSuccess(data, meta))
    } else {
      let data = yield call(getFollowingFeed, account)

      if (data === null) {
        data = []
      }

      yield put(getHomePostsSuccess(data, meta))
    }
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
    data = data.filter(item => invokeFilter(item))

    const mutelist = yield select(state => state.auth.get('mutelist'))
    const opacityUsers = yield select(state => state.auth.get('opacityUsers'))
    const patterns = yield call(getMutePattern)
    data = invokeMuteFilter(data, mutelist, opacityUsers)

    data = patternMute(patterns, data)


    yield put(getLatestPostsSuccess(data, meta))
  } catch(error) {
    yield put(getLatestPostsFailure(error, meta))
  }
}

function* getNewsPostsRequest(payload, meta) {
  const { start_permlink, start_author } = payload

  const params = { sort: 'created', start_permlink, start_author }
  const method = 'get_ranked_posts'

  try {
    const old = yield select(state => state.posts.get('news'))
    let data = yield call(callBridge, method, params, true, 'news')

    data = [...old, ...data]

    data = data.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj['post_id']).indexOf(obj['post_id']) === pos
    })

    yield put(setNewsLastPost(data[data.length-1]))
    data = data.filter(item => invokeFilter(item))

    const mutelist = yield select(state => state.auth.get('mutelist'))
    const opacityUsers = yield select(state => state.auth.get('opacityUsers'))
    const patterns = yield call(getMutePattern)
    data = invokeMuteFilter(data, mutelist, opacityUsers)

    data = patternMute(patterns, data)


    yield put(getNewsPostsSuccess(data, meta))
  } catch(error) {
    yield put(getNewsPostsFailure(error, meta))
  }
}

function* getHivePostsRequest(payload, meta) {
  const { start_permlink, start_author } = payload

  const params = { sort: 'created', start_permlink, start_author }
  const method = 'get_ranked_posts'

  try {
    const old = yield select(state => state.posts.get('hive'))
    let data = yield call(callBridge, method, params, true, 'hive')

    data = [...old, ...data]

    data = data.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj['post_id']).indexOf(obj['post_id']) === pos
    })

    yield put(setHiveLastPost(data[data.length-1]))
    data = data.filter(item => invokeFilter(item))

    const mutelist = yield select(state => state.auth.get('mutelist'))
    const opacityUsers = yield select(state => state.auth.get('opacityUsers'))
    const patterns = yield call(getMutePattern)
    data = invokeMuteFilter(data, mutelist, opacityUsers)

    data = patternMute(patterns, data)


    yield put(getHivePostsSuccess(data, meta))
  } catch(error) {
    yield put(getHivePostsFailure(error, meta))
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
    const {isAuthenticated} = user
    const {file, progress} = payload
    console.log('im here', user)
    if (isAuthenticated) {
      
      const result = yield call(uploadImage, file, progress)

      let images = []

      if (Array.isArray(old) && old.length !== 0) {
        images = [...old]
      }

      const {imageUrl} = result

      images.push(imageUrl)

      yield put(uploadFileSuccess(images, meta))
    } else {
      yield put(uploadFileError('authentication required', meta))
    }
  } catch (error) {
    yield put(uploadFileError(error, meta))
  }
}
function* setPostRequest(payload, meta) {
  yield put(successPostSuccess(payload, meta))

}
function* publishPostRequest(payload, meta) {
  const {tags, payout, perm} = payload
  let tagsWithDbuzz = ['dbuzz']
  tagsWithDbuzz = [...tagsWithDbuzz, ...tags]
  let {body,title} = payload
  let success = false

  const user = yield select(state => state.auth.get('user'))
  const {username, useKeychain, is_authenticated} = user

  const dbuzzImageRegex = /!\[(?:[^\]]*?)\]\((.+?)\)|(https:\/\/storageapi\.fleek\.co\/[a-z-]+\/dbuzz-images\/(dbuzz-image-[0-9]+\.(?:png|jpg|gif|jpeg|webp|bmp)))|(https?:\/\/[a-zA-Z0-9=+-?_]+\.(?:png|jpg|gif|jpeg|webp|bmp|HEIC))|(?:https?:\/\/(?:ipfs\.io\/ipfs\/[a-zA-Z0-9=+-?]+))/gi
  const images = body.match(dbuzzImageRegex)
  body = `${body}`.replace(dbuzzImageRegex, '').trimStart()

  const titleContent = stripHtml(title)
  title = `${titleContent}`.trim()

  // const titleLimit = 82

  // if (title.length > 0) {
  //   const lastSpace = title.substr(0, titleLimit).lastIndexOf(" ")

  //   if (lastSpace !== -1) {
  //     title = `${title.substring(0, lastSpace)} ...`
  //     body = `... ${body.replace(title.substring(0, lastSpace), '')}`
  //   } else {
  //     title = ''
  //   }
  // } else {
  //   title = ''
  // }

  if (images) {
    body += `\n${images.toString().replace(/,/gi, ' ')}`
  }

  body = footnote(body)


  try {
    const operations = yield call(generatePostOperations, username, title, body, tagsWithDbuzz, payout, perm)

    const comment_options = operations[1]
    const permlink = comment_options[1].permlink
    const is_buzz_post = true

    if (useKeychain && is_authenticated) {

      const result = yield call(broadcastKeychainOperation, username, operations)
      success = result.success

      if (!success) {
        yield put(publishPostFailure('Unable to publish post', meta))
      }
    } else {
      let {login_data} = user
      login_data = extractLoginData(login_data)

      const wif = login_data[1]

      const result = yield call(broadcastOperation, operations, [wif], is_buzz_post)

      success = result.success
    }

    if (success) {
      const comment = operations[0]
      const json_metadata = comment[1].json_metadata

      let currentDatetime = moment().toISOString()
      currentDatetime = currentDatetime.replace('Z', '')

      let cashout_time = moment().add(7, 'days').toISOString()
      cashout_time = cashout_time.replace('Z', '')

      let body = comment[1].body
      body = body.replace('<br /><br /> Posted via <a href="https://blog.d.buzz" data-link="promote-link">Blog D.Buzz</a>', '')

      const content = {
        author: username,
        category: 'blog',
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
        parent_permlink: "blog",
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
  } catch (error) {
    if (error?.data?.stack?.[0]?.data?.last_root_post !== undefined &&
      error.data.stack[0].data.last_root_post !== null) {

      const last_root_post = new Date(error.data.stack[0].data.last_root_post)
      const now = new Date(error.data.stack[0].data.now)
      const differenceInMinutes = getTimeLeftInPostingBuzzAgain(last_root_post, now)

      const errorMessage = errorMessageComposer('post_limit', null, differenceInMinutes)

      yield put(publishPostFailure({errorMessage}, meta))

    } else {
      const errorMessage = errorMessageComposer('post', error)
      yield put(publishPostFailure({errorMessage}, meta))
    }

  }
}

function getTimeLeftInPostingBuzzAgain(last_root_post, now) {
  // Convert datetime to timestamps
  const timestamp1 = last_root_post.getTime()
  const timestamp2 = now.getTime()

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = timestamp2 - timestamp1

  // Convert milliseconds to minutes
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60)
  return differenceInMinutes
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

function* publishReplyRequest(payload, meta) {
  try {
    const { parent_author, parent_permlink, ref, treeHistory } = payload
    const user = yield select(state => state.auth.get('user'))
    const { username, useKeychain } = user

    let { body } = payload

    body = footnote(body)

    let replyData = {}

    let success = false
    const operation = yield call(generateReplyOperation, username, body, parent_author, parent_permlink)

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
      const meta = operation[0]

      let currentDatetime = moment().toISOString()
      currentDatetime = currentDatetime.replace('Z', '')

      const reply = {
        author: username,
        category: 'hive-193084',
        permlink: meta[1].permlink,
        title: meta[1].title,
        body: meta[1].body,
        replies: [],
        total_payout_value: '0.000 HBD',
        curator_payout_value: '0.000 HBD',
        pending_payout_value: '0.000 HBD',
        active_votes: [],
        parent_author,
        parent_permlink,
        root_author: parent_author,
        root_permlink: parent_permlink,
        children: 0,
        created: currentDatetime,
      }

      reply.body = reply.body.replace('<br /><br /> Posted via <a href="https://d.buzz" data-link="promote-link">D.Buzz</a>', '')

      reply.refMeta = {
        ref,
        author: parent_author,
        permlink: parent_permlink,
        treeHistory,
      }
      replyData = reply
    }

    const data = {
      success,
      reply: replyData,
    }

    yield put(publishReplySuccess(data, meta))
  } catch(error) {
    const errorMessage = errorMessageComposer('reply', error)
    yield put(publishReplyFailure({ errorMessage }, meta))
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

function* getSearchTags(payload, meta) {
  try {
    const { tag } = payload
    const searchPosts = yield call(searchPostTags, tag)

    yield put(getSearchTagsSuccess(searchPosts, meta))
  } catch(error) {
    yield put(getSearchTagFailure(error, meta))
  }
}

function* searchRequest(payload, meta) {
  try {
    let { query } = payload
    let results = []

    if(`${query}`.match(/^@/g)) {
      query = `${query}`.replace('@', '')
      results = yield call(searchPostAuthor, query)
    }else if(`${query}`.match(/^#/g)) {
      query = `${query}`.replace('#', '')
      results = yield call(searchPostTags, query)
    } else {
      results = yield call(searchPostGeneral, query)
    }

    const profile = yield call(searchPeople, query)
    results.people = profile.reputations

    yield put(searchSuccess(results, meta))
  } catch(error) {
    yield put(searchFailure(error, meta))
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

function* watchGetNewsPostsRequest({payload, meta}) {
  yield call(getNewsPostsRequest, payload, meta)
}

function* watchGetHivePostsRequest({payload, meta}) {
  yield call(getHivePostsRequest, payload, meta)
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

function* watchSetPostRequest({ payload, meta }) {
  yield call(setPostRequest, payload, meta)
}

function* watchFollowRequest({ payload, meta }) {
  yield call(followRequest, payload, meta)
}

function* watchUnfollowRequest({ payload, meta }) {
  yield call(unfollowRequest, payload, meta)
}

function* watchPublishReplyRequest({ payload, meta }) {
  yield call(publishReplyRequest, payload, meta)
}

function* watchGetSearchTags({ payload, meta }) {
  yield call(getSearchTags, payload, meta)
}

function* watchSearchRequest({ payload, meta }) {
  yield call(searchRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(GET_LATEST_POSTS_REQUEST, watchGetLatestPostsRequest)
  yield takeEvery(GET_NEWS_POSTS_REQUEST, watchGetNewsPostsRequest)
  yield takeEvery(GET_HIVE_POSTS_REQUEST, watchGetHivePostsRequest)
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
  yield takeEvery(SET_POST_REQUEST, watchSetPostRequest)
  yield takeEvery(FOLLOW_REQUEST, watchFollowRequest)
  yield takeEvery(UNFOLLOW_REQUEST, watchUnfollowRequest)
  yield takeEvery(UPVOTE_REQUEST, watchUpvoteRequest)
  yield takeEvery(PUBLISH_REPLY_REQUEST, watchPublishReplyRequest)
  yield takeEvery(GET_SEARCH_TAG_REQUEST, watchGetSearchTags)
  yield takeEvery(SEARCH_REQUEST, watchSearchRequest)
}