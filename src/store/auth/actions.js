export const AUTHENTICATE_USER_REQUEST = 'AUTHENTICATE_USER_REQUEST'
export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS'
export const AUTHENTICATE_USER_FAILURE = 'AUTHENTICATE_USER_FAILURE'

export const authenticateUserRequest = (username, password, useKeychain) => ({
  type: AUTHENTICATE_USER_REQUEST,
  payload: { username, password, useKeychain },
  meta: {
    thunk: true,
  },
})

export const authenticateUserSuccess = (response, meta) => ({
  type: AUTHENTICATE_USER_SUCCESS,
  payload: response,
  meta, 
})

export const authenticateUserFailure = (error, meta) => ({
  type: AUTHENTICATE_USER_FAILURE,
  payload: error,
  meta,
})

export const SET_MUTE_LIST = 'SET_MUTE_LIST'

export const setMuteList = (response) => ({
  type: SET_MUTE_LIST,
  payload: response,
})

export const MUTE_USER_REQUEST = 'MUTE_USER_REQUEST'
export const MUTE_USER_FAILURE = 'MUTE_USER_FAILURE'
export const MUTE_USER_SUCCESS = 'MUTE_USER_SUCCESS'

export const muteUserRequest = (user) => ({
  type: MUTE_USER_REQUEST,
  payload: { user },
  meta: {
    thunk: true,
  },
})

export const muteUserFailure = (response, meta) => ({
  type: MUTE_USER_FAILURE,
  payload: response,
  meta,
})

export const muteUserSuccess = (meta) => ({
  type: MUTE_USER_SUCCESS,
  meta,
})

export const SET_ACCOUNT_LIST = 'SET_ACCOUNT_LIST'

export const setAccountList = (list) => ({
  type: SET_ACCOUNT_LIST,
  payload: list,
})

export const GET_SAVED_USER_REQUEST = 'GET_SAVED_USER_REQUEST'
export const GET_SAVED_USER_SUCCESS = 'GET_SAVED_USER_SUCCESS'
export const GET_SAVED_USER_FAILURE = 'GET_SAVED_USER_FAILURE'

export const getSavedUserRequest = () => ({
  type: GET_SAVED_USER_REQUEST,
  meta: {
    thunk: true,
  },
})

export const getSavedUsersSuccess = (response, meta) => ({
  type: GET_SAVED_USER_SUCCESS,
  payload: response,
  meta,
})

export const getSavedUsersFailure = (error, meta) => ({
  type: GET_SAVED_USER_FAILURE,
  payload: error,
  meta,
})

export const SET_OPACITY_USERS = 'SET_OPACITY_USERS'

export const setOpacityUsers = (users) => ({
  type: SET_OPACITY_USERS,
  payload: users,
})

export const SET_HAS_AGREED_PAYOUT = 'SET_HAS_AGREED_PAYOUT'

export const setHasAgreedPayout = (agreedPayout) => ({
  type: SET_HAS_AGREED_PAYOUT,
  payload: agreedPayout,
})

export const SET_FROM_LANDING = 'SET_FROM_LANDING'

export const setFromLanding = (status) => ({
  type: SET_FROM_LANDING,
  payload: { status },
})