import React from 'react'
import { render, cleanup, fireEvent, waitForElement } from 'react-native-testing-library'
import { ProfileScreen } from '../../screens/ProfileScreen'
import getUserInfo from '../../utils/getUserInfo'
import getUserReviews from '../../utils/getUserReviews'
import getUserRatings from '../../utils/getUserRatings'
import followUser from '../../utils/followUser'

const navigation = {
  navigate: jest.fn(),
  getParam: (param) => {
    let data = {
      userId: '123456'
    }
    return data[param]
  }
}

const activeUser = {
  _id: 1,
  name: 'joe',
  avatar: { url: null }
}

jest.mock('../utils/getUserInfo', () => {
  const user = {
    _id: 1,
    email: 'andy@test.com',
    name: 'andy',
    date: 
    '2019-12-26T15:13:22.461+00:00',
    memberOf: [],
    bio: 'Hello world',
    link: 'nope.com',
    following: [],
    avatar: {
      url: 'http://res.cloudinary.com/dkoz1ezfx/image/upload/v1578004715/demo/styfpo4frp1kal8wul1c.jpg'
    }
  }
  return jest.fn(() => Promise.resolve({ data: { user } }))
})

jest.mock('../utils/getUserReviews', () => {
  const reviews = [
    {
      _id: 1,
      userId: {
        _id: 1,
        name: 'andy',
        avatar: { url: null },
        reviewedId: {
          _id: 1,
          name: 'Doffo'
        },
        rating: 4,
        text: 'Hello world',
        likes: []
      }
    },
    {
      _id: 1,
      userId: {
        _id: 1,
        name: 'andy',
        avatar: { url: null },
        reviewedId: {
          _id: 2,
          name: 'Wiens'
        },
        rating: 4,
        text: 'Hello world',
        likes: []
      }
    }
  ]
  return jest.fn(() => Promise.resolve({ data: { reviews } }))
})

jest.mock('../utils/getUserRatings', () => {
  const ratings = [
    [
      {
        wineId: 1,
        userId: {
          name: 'andy',
          avatar: null,
          userId: 1
        },
        rating: 4
      },
      {
        wineId: 2,
        userId: {
          name: 'andy',
          avatar: null,
          userId: 1
        },
        rating: 3
      }
    ]
  ]
  return jest.fn(() => Promise.resolve({ data: { ratings } }))
})

jest.mock('../utils/followUser', () => {
  return jest.fn(() => Promise.resolve({ data: {} }))
})

afterEach(cleanup)

describe('ProfileScreen', () => {
  it('renders a Follow User button if user is authenticated', () => {
    const { queryByTestId } = render(<ProfileScreen isAuthenticated={true} navigation={navigation}/>)
    const button = queryByTestId('follow-btn')

    // waitForElement(queryByTestId('profile-screen'))
    expect(button).not.toBe(null)
  })

  it('calls followUser func if follow user button is clicked', () => {
    const { queryByTestId } = render(<ProfileScreen isAuthenticated={true} navigation={navigation} activeUser={activeUser}/>)
    const button = queryByTestId('follow-btn')
    // waitForElement(queryByTestId('profile-screen'))

    fireEvent.press(button)

    expect(followUser).toHaveBeenCalled
  })

  it('calls getUserInfo, getUserReviews, and getUserRatings on page load', () => {
    render(<ProfileScreen isAuthenticated={true} navigation={navigation} activeUser={activeUser}/>)

    expect(getUserInfo).toHaveBeenCalled()
    expect(getUserRatings).toHaveBeenCalled()
    expect(getUserReviews).toHaveBeenCalled()
  })

  it('renders the ReviewList component', () => {
    const { queryByTestId } = render(<ProfileScreen isAuthenticated={true} navigation={navigation} activeUser={activeUser}/>)
    const reviews = queryByTestId('review-list')

    expect(reviews).not.toBeNull()
  })

})