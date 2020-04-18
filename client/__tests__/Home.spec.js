import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import { Home } from '../screens/Home'
import getReviews from '../utils/getReviewsRecent'

afterEach(cleanup)

const getUserEvents = jest.fn()
const fetchWineries = jest.fn()
const fetchAllReviews = jest.fn()
const navigation = {
  navigate: jest.fn()
}
const user = {
  _id: 1,
  name: 'andy'
}

jest.mock('../utils/getReviewsRecent.js', () => {
  const reviews = [
    {
      _id: 1,
      userId: {
        name: 'andy',
        _id: 1,
        avatar: {
          url: 'hello.com'
        }
      },
      reviewedId: {
        _id: 1,
        name: 'Doffo'
      },
      rating: 4,
      text: 'Hello',
      likes: [],
      timestamp: '2019-12-27T21:59:08.439+00:00'
    },
    {
      _id: 2,
      userId: {
        name: 'andy',
        _id: 1,
        avatar: {
          url: 'hello.com'
        }
      },
      reviewedId: {
        _id: 1,
        name: 'Doffo'
      },
      rating: 3,
      text: 'World',
      likes: [],
      timestamp: '2019-12-27T21:59:08.439+00:00'
    }
  ]
  return jest.fn(() => Promise.resolve({ data: { reviews } }))
})


describe('Home', () => {
  it('renders 6 HomePageLink components if user is not authenticated', () => {
    const { queryAllByTestId } = render(<Home navigation={navigation} getUserEvents={getUserEvents} fetchWineries={fetchWineries} fetchAllReviews={fetchAllReviews} user={user} isAuthenticated={false}/>)
    const links = queryAllByTestId('home-page-link')

    expect(links.length).toBe(6)
  })

  it('renders 5 HomePageLink components if user is authenticated', () => {
    const { queryAllByTestId } = render(<Home navigation={navigation} getUserEvents={getUserEvents} fetchWineries={fetchWineries} fetchAllReviews={fetchAllReviews} user={user} isAuthenticated={true}/>)
    const links = queryAllByTestId('home-page-link')

    expect(links.length).toBe(5)
  })
  
  it('calls fetchWineries, fetchAllReviews and getReviews on page load', () => {
    render(<Home navigation={navigation} getUserEvents={getUserEvents} fetchWineries={fetchWineries} fetchAllReviews={fetchAllReviews} user={user} isAuthenticated={true}/>)

    expect(fetchAllReviews).toHaveBeenCalled()
    expect(fetchWineries).toHaveBeenCalled()
    expect(getReviews).toHaveBeenCalled()
  })
})