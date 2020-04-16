import React from 'react'
import { render, fireEvent, cleanup } from 'react-native-testing-library'
import CommentListItem from '../components/CommentListItem'

const comment = {
  _id: 1,
  text: 'Hey now',
  userId: {
    name: 'andy',
    _id: 'B',
    avatar: {
      url: 'http://res.cloudinary.com/dkoz1ezfx/image/upload/v1578004715/demo/styfpo4frp1kal8wul1c.jpg'
    }
  },
  likes: 5,
  timestamp: '2020-01-28T16:23:22.605+00:00'
}

const addLikeHandler = jest.fn()

afterEach(cleanup)

describe('CommentListItem', () => {
  it('calls the addLike function', () => {
    const { getByTestId } = render(<CommentListItem comment={comment} addLike={addLikeHandler}/>)
    const element = getByTestId('add-like-btn')

    fireEvent.press(element)
    expect(addLikeHandler).toHaveBeenCalledTimes(1)
  })

  it('displays the user name and comment text', () => {
    const { queryByText } = render(<CommentListItem comment={comment} addLike={addLikeHandler}/>)

    const user = queryByText(comment.userId.name)
    const text = queryByText(comment.text)

    expect(user).not.toBeNull()
    expect(text).not.toBeNull()
  })

})