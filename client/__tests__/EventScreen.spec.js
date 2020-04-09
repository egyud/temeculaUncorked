import React from 'react'
import { render } from 'react-native-testing-library'
import { EventScreen } from '../screens/EventScreen'

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

describe('EventScreen', () => {
  it('renders the post comment button if the user is authenticated', () => {
    const { queryByTestId } = render(<EventScreen {...props}/>)
    const element = queryByTestId('post-comment-btn')

    expect(element).not.toBeNull()
  })

  it('does not render the post comment button if the user is not authenticated', () => {
    const { queryByTestId } = render(<EventScreen navigation={props.navigation}/>)
    const element = queryByTestId('post-comment-btn')

    expect(element).toBeNull()
  })

  it('renders the attend button if the user is authenticated', () => {
    const { queryByTestId } = render(<EventScreen {...props}/>)
    const element = queryByTestId('attend-btn')

    expect(element).not.toBeNull()
  })

  it('does not render the attend button if the user is not authenticated', () => {
    const { queryByTestId } = render(<EventScreen navigation={props.navigation}/>)
    const element = queryByTestId('attend-btn')

    expect(element).toBeNull()
  })
})