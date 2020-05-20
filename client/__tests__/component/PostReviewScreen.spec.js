import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import PostReviewScreen from '../../screens/PostReviewScreen'
import postReview from '../../utils/postReview'

const navigation = {
  navigate: jest.fn(),
  getParam: (param) => {
    let data = {
      user: {
        _id: 1,
        name: 'Andy'
      },
      wineryData: {
        _id: 1,
        name: 'Doffo Winery'
      },
      avgRating: 4
    }
    return data[param]
  }
}

jest.mock('../utils/postReview.js', () => {
  return jest.fn(() => Promise.resolve({ data: {} }))
})

afterEach(cleanup)

describe('PostReviewScreen', () => {
  it('renders a rating, text area, and submit button', () => {
    const { queryByTestId } = render(<PostReviewScreen navigation={navigation}/>)
    const rating = queryByTestId('review-rating')
    const textArea = queryByTestId('review-text-area')
    const submitBtn = queryByTestId('submit')

    expect(rating).not.toBeNull()
    expect(textArea).not.toBeNull()
    expect(submitBtn).not.toBeNull()
  })

  it('does not call postReview func if there is no reviewText/no rating', () => {
    const { queryByTestId } = render(<PostReviewScreen navigation={navigation}/>)
    const submitBtn = queryByTestId('submit')

    fireEvent.press(submitBtn)
    expect(postReview).not.toHaveBeenCalled()
  })

  it('calls the postReview func when submit button is pressed, if there is text and a rating', () => {
    const { queryByTestId } = render(<PostReviewScreen navigation={navigation}/>)
    const submitBtn = queryByTestId('submit')
    const textArea = queryByTestId('review-text-area')
    const ratingEl = queryByTestId('review-rating')


    fireEvent.changeText(textArea, 'Hello world')
    fireEvent(ratingEl, 'onFinishRating', 4)
    fireEvent.press(submitBtn)
    expect(postReview).toHaveBeenCalled()
  })
})