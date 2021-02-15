export const CLEAR_ACCOUNT_POSTS = 'CLEAR_ACCOUNT_POSTS'

export const clearAccountPosts = () => ({
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
