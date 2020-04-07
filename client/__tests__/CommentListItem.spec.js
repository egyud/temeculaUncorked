import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import CommentListItem from '../components/CommentListItem'

const comment = {
  _id: 1,
  text: 'Hey now',
  userId: {
    userName: 'A',
    _id: 'B',
    avatar: {
      url: 'http://res.cloudinary.com/dkoz1ezfx/image/upload/v1578004715/demo/styfpo4frp1kal8wul1c.jpg'
    }
  },
  likes: 5,
  timestamp: '2020-01-28T16:23:22.605+00:00'
}

describe('CommentListItem', () => {
  describe('clicking like button', () => {
    it('calls the addLike function', () => {
      const { getByTestId } = render(<CommentListItem comment={comment}/>)
      const element = getByTestId('add-like-btn')
      const spy = jest.spyOn(CommentListItem, 'modifyTimestamp')
      spy.mockImpl

      fireEvent.press(element)
      expect(spy).toHaveBeenCalledTimes(3)
      
    })
  })
})