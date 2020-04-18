import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import { ReviewScreen } from '../screens/ReviewScreen'
import getComments from '../utils/getCommentsReview'

afterEach(cleanup)

const navigation = {
  navigate: jest.fn(),
  getParam: (param) => {
    const data = {
      review: {
        _id: 1,
        userId: {
          _id: 1,
          name: "andy",
          avatar: { url: null }
        },
        reviewedId: 3,
        rating: 4,
        timestamp: '123',
        text: 'Hello world',
        likes: []
      }
    }
    return data[param]
  }
}

const activeUser = {
  _id: 1,
  name: 'Andy',
  avatar: {
    url: 'something',
  }
}

jest.mock('../utils/getCommentsReview.js', () => {
  const comments = [
    {
      _id: 1,
      text: 'Hello',
      likes: [],
      timestamp: '123',
      reviewId: 1,
      userId: {
        _id: 1,
        avatar: { url: null },
        name: 'andy'
      }
    },
    {
      _id: 2,
      text: 'World',
      likes: [],
      timestamp: '456',
      reviewId: 1,
      userId: {
        _id: 2,
        avatar: { url: null },
        name: 'john'
      }
    },
  ]
  return jest.fn(() => Promise.resolve({ data: { comments }}))
})

describe('ReviewScreen', () => {
  it('renders a Post Comment Button if user is authenticated', () => {
    const { queryByTestId } = render(<ReviewScreen isAuthenticated={true} navigation={navigation} activeUser={activeUser}/>)
    const element = queryByTestId('post-comment-btn')

    expect(element).not.toBeNull()

  })

  it('calls getComments on page load', () => {
    render(<ReviewScreen navigation={navigation} activeUser={activeUser} isAuthenticated={true}/>)

    expect(getComments).toHaveBeenCalled()
  })

  it('renders the CommentList and Review components', () => {
    const { queryByTestId } = render(<ReviewScreen isAuthenticated={true} navigation={navigation} activeUser={activeUser}/>)

    const commentList = queryByTestId('comment-list')
    const review = queryByTestId('review')

    expect(commentList).not.toBeNull()
    expect(review).not.toBeNull()
  }) 
})