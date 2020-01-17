import { FETCH_ALL_REVIEWS } from '../actions/reviewActions'

const initialState = {
  reviews: []
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case FETCH_ALL_REVIEWS:
      return {
        reviews: payload
      }
    default:
      return state
  }
}