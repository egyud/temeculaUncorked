import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import Review from '../../components/Review'

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

const navigation = {
  navigate: jest.fn()
}

describe('Review', () => {
  it('should render a Thumbnail and users name if it is not on the profile screen', () => {
    const { queryByTestId, queryByText } = render(<Review isProfileScreen={false} review={review}/>)
    const thumbnail = queryByTestId('review-thumbnail')
    const name = queryByText('Joe')

    expect(thumbnail).not.toBeNull()
    expect(name).not.toBeNull()
  })

  it('should not render a Thumbnail/users name if it is on the profile screen', () => {
    const { queryByTestId, queryByText } = render(<Review isProfileScreen={true} review={review}/>)
    const thumbnail = queryByTestId('review-thumbnail')
    const name = queryByText('Joe')

    expect(thumbnail).toBeNull()
    expect(name).toBeNull()
  })

  it('should render the correct number of likes', () => {
    const { queryByText } = render(<Review isProfileScreen={true} review={review}/>)
    const element = queryByText('3 Likes')

    expect(element).not.toBeNull()
  })

  it('calls the addLike function when button is pressed', () => {
    const addLikeHandler = jest.fn()
    const { queryByTestId } = render(<Review isProfileScreen={true} review={review} addLike={addLikeHandler}/>)
    const element = queryByTestId('add-like-button')

    fireEvent.press(element)
    expect(addLikeHandler).toHaveBeenCalledTimes(1)
  })

  it('calls navigate when user name or view comments button is pressed', () => {
    const { queryByTestId } = render(<Review isProfileScreen={false} review={review} navigation={navigation}/>)
    const name = queryByTestId('user-name')
    const button = queryByTestId('view-comments')

    fireEvent.press(name)
    fireEvent.press(button)

    expect(navigation.navigate).toHaveBeenCalledTimes(2)
  })
})