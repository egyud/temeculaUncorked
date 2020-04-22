import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import ReviewList from '../components/ReviewList'

afterEach(cleanup)

const navigation = {
  navigate: jest.fn()
}

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
      name: 'joe',
      _id: 2,
      avatar: {
        url: 'hello.com'
      }
    },
    reviewedId: {
      _id: 2,
      name: 'Wiens'
    },
    rating: 3,
    text: 'World',
    likes: [],
    timestamp: '2019-12-27T21:59:08.439+00:00'
  }
]

describe('ReviewList', () => {
  it('renders a Review component for every review passed in', () => {
    const { queryAllByTestId } = render(<ReviewList reviews={reviews} navigation={navigation} isProfileScreen={false}/>)
    const reviewItems = queryAllByTestId('review')

    expect(reviewItems.length).toBe(reviews.length)
  })
})