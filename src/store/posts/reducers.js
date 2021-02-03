import {
  GET_TRENDING_TAGS_REQUEST,
} from './actions'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  tags: [],
})

export const posts = (state = defaultState, { type, payload }) => {
  switch (type) {
  case GET_TRENDING_TAGS_REQUEST:
    return state.set('tags', payload)
  default:
    return state
  }
}