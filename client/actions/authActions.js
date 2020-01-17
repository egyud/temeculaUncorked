import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

export const GET_ERRORS = "GET_ERRORS"
export const USER_LOADING = "USER_LOADING"
export const SET_CURRENT_USER = "SET_CURRENT_USER"

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http:localhost:5000/api/users/register', userData)
    if (response) {
      console.log(response.data)
      // if registration is successful, redirect to login drawer
      return dispatch(showLoginDrawer())
    }
  } catch(err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }

}

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http:localhost:5000/api/users/login', userData)
    if (response) {
      // Set token to localStorage
      const { token, user } = response.data
      localStorage.setItem("jwtToken", token)
      // set token to Auth header
      console.log('token')
      console.log(token)
      setAuthToken(token)
      // decode token to get user data
      const decoded = jwt_decode(token)
      console.log('decoded')
      console.log(decoded)
      // Set current user
      dispatch(setCurrentUser(decoded, user))
      // dispatch(hideBothDrawers())
    }
  } catch(err) {
    console.log(err.response.data)
    return dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// set logged in user
export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: {
      decoded,
      user
    }
  }
}

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  }
}

// log user out
export const logoutUser = () => (dispatch) => {
  // remove token from local storage
  localStorage.removeItem("jwtToken")
  // Remove auth header for future requests
  setAuthToken(false)
  // set current user to empty object { whic will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}