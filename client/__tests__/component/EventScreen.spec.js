import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import { EventScreen } from '../../screens/EventScreen'
import getComments from '../../utils/getCommentsEvent'
import attendEvent from '../../utils/attendEvent'

const event = {
  title: 'Cool event',
  winery: 'Doffo Winery',
  date: 'June 25th, 2020',
  time: '7-8pm',
  price: '$55',
  attending: [1, 2, 3, 4],
  membersOnly: false,
  adultsOnly: true,
  description: 'Fun times and stuff',
  address: '123 Fake Street',
  _id: 1
}

const props = {
  navigation: {
    navigate: jest.fn(),
    getParam: () => event
  },
  activeUser: {
    _id: 1,
    name: 'Andy'
  },
  isAuthenticated: true
}

jest.mock('../utils/getCommentsEvent.js', () => {
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
  return jest.fn(() => Promise.resolve({ data: { comments } }))
})

jest.mock('../utils/attendEvent.js', () => {
  return jest.fn(() => Promise.resolve({ data: {} }))
})

afterEach(cleanup)

describe('EventScreen', () => {
  it('renders the post comment button and attend button if the user is authenticated', () => {
    const { queryByTestId } = render(<EventScreen {...props}/>)
    const commentBtn = queryByTestId('post-comment-btn')
    const attendBtn = queryByTestId('attend-btn')

    expect(commentBtn).not.toBeNull()
    expect(attendBtn).not.toBeNull()
  })

  it('does not render the post comment button/attend button if the user is not authenticated', () => {
    const { queryByTestId } = render(<EventScreen navigation={props.navigation}/>)
    const commentBtn = queryByTestId('post-comment-btn')
    const attendBtn = queryByTestId('attend-btn')

    expect(commentBtn).toBeNull()
    expect(attendBtn).toBeNull()
  })

  it('calls the getComments func on page load', () => {
    render(<EventScreen navigation={props.navigation}/>)

    expect(getComments).toHaveBeenCalled()
  })

  it('displays the relevant data about the event', () => {
    const { queryByText } = render(<EventScreen navigation={props.navigation}/>)

    const title = queryByText(event.title)
    const winery = queryByText(event.winery)
    const date = queryByText(event.date)
    const time = queryByText(event.time)
    const description = queryByText(event.description)
    const address = queryByText(event.address)

    expect(title).not.toBeNull()
    expect(winery).not.toBeNull()
    expect(date).not.toBeNull()
    expect(time).not.toBeNull()
    expect(description).not.toBeNull()
    expect(address).not.toBeNull()
  })

  it('calls the attendEvent func when attend button is pressed', () => {
    const { queryByTestId } = render(<EventScreen {...props}/>)
    const attendBtn = queryByTestId('attend-btn')

    fireEvent.press(attendBtn)

    expect(attendEvent).toHaveBeenCalled()
  })

  it('calls navigate function when post comment button is pressed', () => {
    const { queryByTestId } = render(<EventScreen {...props}/>)
    const postCommentBtn = queryByTestId('post-comment-btn')

    fireEvent.press(postCommentBtn)

    expect(props.navigation.navigate).toHaveBeenCalled()
  })

  it('displays the comment list component', () => {
    const { queryByTestId } = render(<EventScreen {...props}/>)
    const commentList = queryByTestId('comment-list')

    expect(commentList).not.toBeNull()
  })
})