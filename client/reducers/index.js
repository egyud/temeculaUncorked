import { combineReducers } from 'redux'

import wineReducer from './wineReducer'
import authReducer from './authReducer'
import reviewReducer from './reviewReducer'

const rootReducer = combineReducers({
  authReducer,
  wineReducer,
  reviewReducer
})

export default rootReducer