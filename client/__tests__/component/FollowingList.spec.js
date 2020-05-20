import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import FollowingList from '../../components/FollowingList'

const users = [
  {
    _id: 1,
    name: 'andy',
  },
  {
    _id: 2,
    name: 'amy',
    avatar: {
      url: 'http://res.cloudinary.com/dkoz1ezfx/image/upload/v1578004715/demo/styfpo4frp1kal8wul1c.jpg'
    }
  },
  {
    _id: 3,
    name: 'lenny',
    avatar: {
      url: 'http://res.cloudinary.com/dkoz1ezfx/image/upload/v1578004715/demo/styfpo4frp1kal8wul1c.jpg'
    }
  }
]

afterEach(cleanup)

describe('FollowingList', () => {
  it('should display a message if there are no users passed in', () => {
    const { queryByText } = render(<FollowingList />)
    const element = queryByText('You are not following any users')

    expect(element).not.toBeNull()
  })

  it('should display a message if the users array is empty', () => {
    const { queryByText } = render(<FollowingList users={[]}/>)
    const element = queryByText('You are not following any users')

    expect(element).not.toBeNull()
  })

  it('should render the same number of ListItems as there are users passed in', () => {
    const { queryAllByTestId } = render(<FollowingList users={users}/>)
    const elements = queryAllByTestId('following-list-item')

    expect(elements.length).toEqual(users.length)
  })

  it('should render a Thumbnail if a user has an avatar', () => {
    const { queryAllByTestId } = render(<FollowingList users={users}/>)
    const elements = queryAllByTestId('thumbnail-avatar')

    expect(elements.length).toEqual(2)
  })
})