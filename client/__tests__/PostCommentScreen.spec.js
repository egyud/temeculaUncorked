import React from 'react'
import { render, fireEvent, cleanup } from 'react-native-testing-library'
import PostCommentScreen from '../screens/PostCommentScreen'
import { postEventComment, postReviewComment } from '../utils/postComment'

const navigation = {
  navigate: jest.fn(),
  getParam: (param) => {
    let data = {
      activeUser: {
        _id: 1,
        name: 'Andy'
      },
      review: {
        userId: 1,
        reviewedId: 1,
        rating: 2,
        text: 'Hello',
        likes: [],
        _id: 1
      },
      event: {
        title: 'Event 1',
        date: 'Tomorrow',
        time: '8pm',
        winery: 'Doffo',
        attending: [],
        description: 'Hello',
        adultsOnly: false,
        membersOnly: true,
        price: '$1'
      },
      type: 'review'
    }
    return data[param]
  }
}

jest.mock('../utils/postComment.js', () => {
  return {
    postEventComment: jest.fn(() => Promise.resolve({ data: {} })),
    postReviewComment: jest.fn(() => Promise.resolve({ data: {} }))
  }
})

afterEach(cleanup)

describe('PostCommentScreen', () => {
  it('renders a text area and submit button', () => {
    const { queryByTestId } = render(<PostCommentScreen navigation={navigation}/>)
    const submitBtn = queryByTestId('submit-button')
    const textArea = queryByTestId('text-area')

    expect(submitBtn).not.toBeNull()
    expect(textArea).not.toBeNull()
  })

  it('does not call postComment func if text area is empty', () => {
    const { queryByTestId } = render(<PostCommentScreen navigation={navigation}/>)
    const submitBtn = queryByTestId('submit-button')

    fireEvent.press(submitBtn)
    expect(postReviewComment).not.toHaveBeenCalled()
  })

  it('calls the postComment func when submit button is pressed, if there is comment text', () => {
    const { queryByTestId } = render(<PostCommentScreen navigation={navigation}/>)
    const submitBtn = queryByTestId('submit-button')
    const textArea = queryByTestId('text-area')

    fireEvent.changeText(textArea, 'Hello world')
    fireEvent.press(submitBtn)

    expect(postReviewComment).toHaveBeenCalled()
  })
})