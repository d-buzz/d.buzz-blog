import {
  AUTHENTICATE_USER_SUCCESS,
  GET_SAVED_USER_SUCCESS,
  SET_OPACITY_USERS,
  SET_HAS_AGREED_PAYOUT,
  SET_FROM_LANDING,
  SET_MUTE_LIST,
  MUTE_USER_SUCCESS,
} from './actions'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  user: {},
  fromLanding: false,
  opacityUsers: [],
  payoutAgreed: false,
  mutelist: [],
})

export const auth = (state = defaultState, { type, payload }) => {
  switch (type) {
  case AUTHENTICATE_USER_SUCCESS:
    return state.set('user', payload)
  case GET_SAVED_USER_SUCCESS:
    return state.set('user', payload)
  case SET_OPACITY_USERS:
    return state.set('opacityUsers', payload)
  case SET_HAS_AGREED_PAYOUT:
    return state.set('payoutAgreed', payload)
  case SET_FROM_LANDING:
    return state.set('fromLanding', payload)
  case SET_MUTE_LIST:
    return state.set('mutelist', payload)
  case MUTE_USER_SUCCESS:
    return state.set('mutelist', payload)
  default: 
    return state
  }
}