import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import ActivityFeed from '../../components/ActivityFeed'

const reviews = [
  {
    _id: 1,
    userId: {
      name: 'andy',
      _id: 1,
      avatar: {
        url: 'hello.com'
      }
    },
    reviewedId: {
      _id: 1,
      name: 'Doffo'
    },
    rating: 4,
    text: 'Hello',
    likes: [],
    timestamp: '2019-12-27T21:59:08.439+00:00'
  },
  {
    _id: 2,
    userId: {
      name: 'joe',
      _id: 2,
      avatar: {
        url: 'hello.com'
      }
    },
    reviewedId: {
      _id: 2,
      name: 'Wiens'
    },
    rating: 3,
    text: 'World',
    likes: [],
    timestamp: '2019-12-27T21:59:08.439+00:00'
  }
]

const navigation = {
  navigate: jest.fn()
}

afterEach(cleanup)

describe('ActivityFeed', () => {
  it('calls navigate function when clicked', () => {
    const { queryAllByTestId } = render(<ActivityFeed navigation={navigation} isLoading={false} reviews={reviews}/>)
    const elements = queryAllByTestId('activity-feed-item')

    fireEvent.press(elements[0])

    expect(navigation.navigate).toHaveBeenCalled()
  })

  it('renders an activity feed item for each review passed in', () => {
    const { queryAllByTestId } = render(<ActivityFeed navigation={navigation} isLoading={false} reviews={reviews}/>)
    const elements = queryAllByTestId('activity-feed-item')

    expect(elements.length).toBe(reviews.length)
  })

  it('displays a Spinner if isLoading is true', () => {
    const { queryByTestId } = render(<ActivityFeed navigation={navigation} isLoading={true} reviews={reviews}/>)
    const spinner = queryByTestId('spinner')

    expect(spinner).not.toBeNull()
  })

  it('displays relevant data for each review', () => {
    const { queryByText } = render(<ActivityFeed navigation={navigation} isLoading={false} reviews={reviews}/>)
    
    const userName = queryByText(reviews[0].userId.name)
    const wineryName = queryByText(`Reviewed ${reviews[0].reviewedId.name}`)

    expect(userName).not.toBeNull()
    expect(wineryName).not.toBeNull()
  })
})