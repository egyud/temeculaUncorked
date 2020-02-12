import { SET_CURRENT_USER, USER_LOADING, SET_USER_EVENTS } from '../actions/authActions'
import isEmpty from 'is-empty'

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  userEvents: []
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload,
      }
    case SET_USER_EVENTS:
      return {
        ...state,
        userEvents: payload
      }
    case USER_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}