import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import deviceStorage from '../utils/deviceStorage'

export const GET_ERRORS = "GET_ERRORS"
export const USER_LOADING = "USER_LOADING"
export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const SET_USER_EVENTS = "SET_USER_EVENTS"

// Register User
export const registerUser = (userData, navigation) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/register', userData)
    if (response) {
      // if registration is successful, redirect to login drawer
      return navigation.navigate('Login')
    }
  } catch(err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

export const loginUser = (userData, navigation) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', userData)
    if (response) {
      // Save token to deviceStorage
      const { token, user } = response.data
      deviceStorage.saveItem("jwtToken", token)
      // set token to Auth header
      setAuthToken(token)
      // decode token to get user data
      const decoded = jwt_decode(token)
      // Set current user
      dispatch(setCurrentUser(decoded, user))
      return navigation.navigate('Home')
    }
  } catch(err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// get a list of all events the user is set to attend
export const getUserEvents = (user) => async (dispatch) => {
  console.log('in get User Events ')
  try {
    const response = await axios.get(`http://localhost:5000/api/events/user/${user._id}`)
    const { events } = response.data
    return dispatch(setUserEvents(events))
  } catch (error) {
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

export const setUserEvents = (events) => {
  return {
    type: SET_USER_EVENTS,
    payload: {
      events
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