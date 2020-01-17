import { FETCH_CLUBS,  FETCH_ALL_WINERIES, FETCH_ALL_WINES } from '../actions/wineActions'

const initialState = {
  wineClubs: [],
  wineriesList: [],
  wineList: []
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case FETCH_CLUBS:
      return {
        ...state,
        wineClubs: payload
      }
    case FETCH_ALL_WINERIES:
      return {
        ...state,
        wineriesList: payload
      }
    case FETCH_ALL_WINES:
      return {
        ...state,
        wineList: payload
      }
    default:
    return state
  }
}