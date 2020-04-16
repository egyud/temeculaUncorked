import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import CommentList from '../components/CommentList'

const comments = [
  {
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

  },
  {
    _id: 2,
    text: 'Yoooo',
    userId: {
      userName: 'A',
      _id: 'B',
      avatar: {
        url: 'http://res.cloudinary.com/dkoz1ezfx/image/upload/v1578004715/demo/styfpo4frp1kal8wul1c.jpg'
      }
    },
    likes: 5,
    timestamp: '2020-01-28T16:23:22.605+00:00'
  },
  {
    _id: 3,
    text: 'Hello',
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
]

afterEach(cleanup)

describe('CommentList', () => {
  it('should display a message if there are no comments', () => {
    const { queryByText } = render(<CommentList />)
    const element = queryByText('No comments to display')

    expect(element).not.toBeNull()
  })

  it('should display a message if the comments array is empty', () => {
    const { queryByText } = render(<CommentList comments={[]}/>)
    const element = queryByText('No comments to display')

    expect(element).not.toBeNull()
  })

  it('should not display the "no comment" message if there are comments', () => {
    const { queryByText } = render(<CommentList comments={comments}/>)
    const element = queryByText('No comments to display')

    expect(element).toBeNull()
  })

  it('should render the same number of CommentListItems as there are comments passed as props', () => {
    const { queryAllByTestId } = render(<CommentList comments={comments}/>)
    const elements = queryAllByTestId('comment-list-item')

    expect(elements.length).toEqual(comments.length)
  })
})