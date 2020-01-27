import axios from 'axios'
import { GET_ERRORS } from './authActions';

export const FETCH_ALL_REVIEWS = "FETCH_ALL_REVIEWS"

export const fetchAllReviews = () => async (dispatch) => {
  console.log('in fetchAllReviews, no response yet')
  const response = await axios.get('http://localhost:5000/api/reviews/winery')
  if (response) {
    console.log('in fetchAllReviews, yes response yet')
    console.log(response)
    return dispatch({
      type: FETCH_ALL_REVIEWS,
      payload: response
    })
  }

}