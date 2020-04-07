import React from 'react'
import { render } from 'react-native-testing-library'
import Review from '../components/Review'

const review = {
  _id: 1,
  text: 'Hello world',
  rating: 4,
  likes: [1, 2, 3],
  timestamp: '2020-03-16T17:57:29.279+00:00',
  userId: {
    name: 'Joe',
    _id: '1',
    avatar: {
      url: undefined
    }
  },
  reviewedId: {
    name: 'Doffo'
  }
}

describe('Review', () => {
  it('should render a Thumbnail if it is not on the profile screen', () => {
    const { queryByTestId } = render(<Review isProfileScreen={false} review={review}/>)
    const element = queryByTestId('review-thumbnail')

    expect(element).not.toBeNull()
  })

  it('should not render a Thumbnail if it is on the profile screen', () => {
    const { queryByTestId } = render(<Review isProfileScreen={true} review={review}/>)
    const element = queryByTestId('review-thumbnail')

    expect(element).toBeNull()
  })

  it('should render the users name if it is on the profile screen', () => {
    const { queryByText } = render(<Review isProfileScreen={false} review={review}/>)
    const element = queryByText('Joe')

    expect(element).not.toBeNull()
  })

  it('should render the users name if it is on the profile screen', () => {
    const { queryByText } = render(<Review isProfileScreen={true} review={review}/>)
    const element = queryByText('Joe')

    expect(element).toBeNull()
  })

  it('should render the correct number of likes', () => {
    const { queryByText } = render(<Review isProfileScreen={true} review={review}/>)
    const element = queryByText('3 Likes')

    expect(element).not.toBeNull()
  })
})