import React from 'react'
import { render } from 'react-native-testing-library'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import rootReducer from '../reducers/index'

const INITIAL_STATE = {
  authReducer: {
    isAuthenticated: false,
    user: {},
    loading: false,
    userEvents: []
  },
  wineReducer: {
    wineClubs: [],
    wineriesList: [],
    wineList: []
  },
  reviewReducer: {
    reviews: []
  }
}
const mockStore = configureStore([])
const store = mockStore(INITIAL_STATE)

const reduxRender = (ui, options) => {
  render(ui, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    ...options
  })
}

// re-export everything for convenience
export * from 'react-native-testing-library'

// override render method
export { reduxRender as render, store }