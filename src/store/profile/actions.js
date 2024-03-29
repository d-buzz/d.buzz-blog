export const CLEAR_ACCOUNT_POSTS = 'CLEAR_ACCOUNT_POSTS'

export const clearAccountBlog = () => ({
  type: CLEAR_ACCOUNT_POSTS,
})

export const CLEAR_ACCOUNT_REPLIES = 'CLEAR_ACCOUNT_REPLIES'

export const clearAccountReplies = () => ({
  type: CLEAR_ACCOUNT_REPLIES,
})

export const SET_PROFILE_IS_VISITED = 'SET_PROFILE_IS_VISITED'

export const setProfileIsVisited = (visited = true) => ({
  type: SET_PROFILE_IS_VISITED,
  payload: visited,
})

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST'
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE'

export const getProfileRequest = (username) => ({
  type: GET_PROFILE_REQUEST,
  payload: { username },
  meta: {
    thunk: true,
  },
})

export const getProfileSuccess = (response, meta) => ({
  type: GET_PROFILE_SUCCESS,
  payload: response,
  meta,
})

export const getProfileFailure = (error, meta) => ({
  type: GET_PROFILE_FAILURE,
  payload: error,
  meta,
})

export const GET_ACCOUNT_BLOG_REQUEST = 'GET_ACCOUNT_BLOG_REQUEST'
export const GET_ACCOUNT_BLOG_SUCCESS = 'GET_ACCOUNT_BLOG_SUCCESS'
export const GET_ACCOUNT_BLOG_FAILURE = 'GET_ACCOUNT_BLOG_FAILURE'

export const getAccountBlogRequest = (username, start_permlink = null, start_author = null) => ({
  type: GET_ACCOUNT_BLOG_REQUEST,
  payload: { username, start_permlink, start_author },
  meta: {
    thunk: true,
  },
})

export const getAccountBlogSuccess = (response, meta) => ({
  type: GET_ACCOUNT_BLOG_SUCCESS,
  payload: response,
  meta,
})

export const getAccountBlogFailure = (error, meta) => ({
  type: GET_ACCOUNT_BLOG_FAILURE,
  payload: error,
  meta,
})

export const SET_LAST_ACCOUNT_BLOG = 'SET_LAST_ACCOUNT_BLOG'

export const setLastAccountBlog = (response) => ({
  type: SET_LAST_ACCOUNT_BLOG,
  payload: response,
})

export const GET_ACCOUNT_REPLIES_REQUEST = 'GET_ACCOUNT_REPLIES_REQUEST'
export const GET_ACCOUNT_REPLIES_SUCCESS = 'GET_ACCOUNT_REPLIES_SUCCESS'
export const GET_ACCOUNT_REPLIES_FAILURE = 'GET_ACCOUNT_REPLIES_FAILURE'

export const getAccountRepliesRequest = (username, start_permlink = '', start_author = '') => ({
  type: GET_ACCOUNT_REPLIES_REQUEST,
  payload: { username, start_permlink, start_author },
  meta: {
    thunk: true,
  },
})

export const getAccountRepliesSuccess = (response, meta) => ({
  type: GET_ACCOUNT_REPLIES_SUCCESS,
  payload: response,
  meta,
})

export const getAccountRepliesFailure = (error, meta) => ({
  type: GET_ACCOUNT_REPLIES_FAILURE,
  payload: error,
  meta,
})

export const SET_LAST_ACCOUNT_REPLY = 'SET_LAST_ACCOUNT_REPLY'

export const setLastAccountReply = (response) => ({
  type: SET_LAST_ACCOUNT_REPLY,
  payload: response,
})

export const CLEAR_PROFILE = 'CLEAR_PROFILE'

export const clearProfile = () => ({
  type: CLEAR_PROFILE,
})

export const CLEAR_ACCOUNT_FOLLOWERS = 'CLEAR_FOLLOWERS'

export const clearAccountFollowers = () => ({
  type: CLEAR_ACCOUNT_FOLLOWERS,
})

export const CLEAR_ACCOUNT_FOLLOWING = 'CLEAR_FOLLOWING'

export const clearAccountFollowing = () => ({
  type: CLEAR_ACCOUNT_FOLLOWING,
})

export const CLEAR_ACCOUNT_COMMENTS = 'CLEAR_ACCOUNT_COMMENTS'

export const clearAccountComments = () => ({
  type: CLEAR_ACCOUNT_COMMENTS,
})

export const GET_ACCOUNT_COMMENTS_REQUEST = 'GET_ACCOUNT_COMMENTS_REQUEST'
export const GET_ACCOUNT_COMMENTS_SUCCESS = 'GET_ACCOUNT_COMMENTS_SUCCESS'
export const GET_ACCOUNT_COMMENTS_FAILURE = 'GET_ACCOUNT_COMMNETS_FAILURE'

export const getAccountCommentsRequest = (username, start_permlink = null, start_author = null) => ({
  type: GET_ACCOUNT_COMMENTS_REQUEST,
  payload: { username, start_permlink, start_author },
  meta: {
    thunk: true,
  },
})

export const getAccountCommentsSucess = (response, meta) => ({
  type: GET_ACCOUNT_COMMENTS_SUCCESS,
  payload: response,
  meta,
})

export const getAccountCommentsFailure = (error, meta) => ({
  type: GET_ACCOUNT_COMMENTS_FAILURE,
  payload: error,
  meta,
})

export const SET_LAST_ACCOUNT_COMMENT = 'SET_LAST_ACCOUNT_COMMENT'

export const setLastAccountComment = (response) => ({
  type: SET_LAST_ACCOUNT_REPLY,
  payload: response,
})

export const GET_FOLLOWERS_REQUEST = 'GET_FOLLOWERS_REQUEST'
export const GET_FOLLOWERS_SUCCESS = 'GET_FOLLOWERS_SUCCESS'
export const GET_FOLLOWERS_FAILURE = 'GET_FOLLOWERS_fAILURE'

export const getFollowersRequest = (username, start_follower = '') => ({
  type: GET_FOLLOWERS_REQUEST,
  payload: { username, start_follower },
  meta: {
    thunk: true,
  },
})

export const getFollowersSuccess = (response, meta) => ({
  type: GET_FOLLOWERS_SUCCESS,
  payload: response,
  meta,
})

export const getFollowersFailure = (error, meta) => ({
  type: GET_FOLLOWERS_FAILURE,
  payload: error,
  meta,
})

export const SET_LAST_FOLLOWER = 'SET_LAST_FOLLOWER'

export const setLastFollower = (response) => ({
  type: SET_LAST_FOLLOWER,
  payload: response,
})

export const GET_FOLLOWING_REQUEST = 'GET_FOLLOWING_REQUEST'
export const GET_FOLLOWING_SUCCESS = 'GET_FOLLOWING_SUCCESS'
export const GET_FOLLOWING_FAILURE = 'GET_FOLLOWING_FAILURE'

export const getFollowingRequest = (username, start_following = '') => ({
  type: GET_FOLLOWING_REQUEST,
  payload: { username, start_following },
  meta: {
    thunk: true,
  },
})

export const getFollowingSuccess = (response, meta) => ({
  type: GET_FOLLOWING_SUCCESS,
  payload: response,
  meta,
})

export const getFollowingFailure = (error, meta) => ({
  type: GET_FOLLOWING_FAILURE,
  payload: error,
  meta,
})

export const SET_LAST_FOLLOWING = 'SET_LAST_FOLLOWING'

export const setLastFollowing = (response) => ({
  type: SET_LAST_FOLLOWING,
  payload: response,
})
