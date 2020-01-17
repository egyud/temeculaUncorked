import axios from 'axios'

export const FETCH_CLUBS = 'FETCH_CLUBS'
export const FETCH_ALL_WINES = 'FETCH_ALL_WINES'
export const FETCH_ALL_WINERIES = 'FETCH_ALL_WINERIES'

export const fetchWineClubs = () => async (dispatch) => {
  const response = await axios.get('/api/wineries/club')

  return dispatch({
    type: FETCH_CLUBS,
    payload: response.data.data
  })
}

export const fetchWineList = () => async (dispatch) => {
  const response = await axios.get('/api/wines')

  return dispatch({
    type: FETCH_ALL_WINES,
    payload: response.data.wines
  })
}

export const fetchWineryList = () => async (dispatch) => {
  console.log('in fetchWineryList')
  const response = await axios.get('/api/wineries')
  console.log(response)
  return dispatch({
    type: FETCH_ALL_WINERIES,
    payload: response.data.wineries
  })
}