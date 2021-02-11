import {
  AUTHENTICATE_USER_SUCCESS,
  GET_SAVED_USER_SUCCESS,
  SET_OPACITY_USERS,
  SET_HAS_AGREED_PAYOUT,
} from './actions'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  user: {},
  opacityUsers: [],
  payoutAgreed: false,
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
  default: 
    return state
  }
}