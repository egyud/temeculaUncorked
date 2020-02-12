import axios from 'axios'
import { GET_ERRORS } from './authActions';

export const FETCH_CLUBS = 'FETCH_CLUBS'
export const FETCH_ALL_WINES = 'FETCH_ALL_WINES'
export const FETCH_ALL_WINERIES = 'FETCH_ALL_WINERIES'

export const fetchWineClubs = () => async (dispatch) => {
  try {    
    const response = await axios.get('http://localhost:5000/api/wineries/club')
  
    return dispatch({
      type: FETCH_CLUBS,
      payload: response.data.data
    })
  } catch (err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

export const fetchWineList = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/wines')
  
    return dispatch({
      type: FETCH_ALL_WINES,
      payload: response.data.wines
    })
  } catch (err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

export const fetchWineryList = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/wineries')
  
    return dispatch({
      type: FETCH_ALL_WINERIES,
      payload: response.data.wineries
    })
  } catch (err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}