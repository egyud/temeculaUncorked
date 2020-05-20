import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import { WineryScreen } from '../../screens/WineryScreen'
import getUserRating from '../../utils/getUserRating'
import getWineryImages from '../../utils/getWineryImages'
import getEventsData from '../../utils/getEventsData'
import getWineryData from '../../utils/getWineryData'

const navigation = {
  navigate: jest.fn(),
  getParam: (param) => {
    const data = {
      winery: {
        _id: 1,
        name: "Doffo"
      }
    }
    return data[param]
  }
}

const wineryList = [
  {
    name: 'Wiens',
    _id: 1
  },
  {
    name: 'Doffo',
    _id: 2
  }
]

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

jest.mock('../utils/getUserRating', () => {
  return jest.fn(() => Promise.resolve({ data: { review: 4 } }))
})
jest.mock('../utils/getEventsData', () => {
  const events = [
    {
      title: "Band playing live",
      winery: "Akash Winery",
      date: "2020-04-01",
      time: "8pm",
      description: "This is a description.",
      price: "$10",
      membersOnly: false,
      adultsOnly: true,
      attending: [],
      _id: 1
    },
    {
      title: "Band playing live",
      winery: "Akash Winery",
      date: "2020-04-01",
      time: "8pm",
      description: "This is a description.",
      price: "$10",
      membersOnly: false,
      adultsOnly: true,
      attending: [],
      _id: 2
    }
  ]
  return jest.fn(() => Promise.resolve({ data: { events } }))
})
jest.mock('../utils/getWineryImages', () => {
  const images = [
    {
      _id: 1,
      winery: {
        _id: 1,
      },
      url: 'hello.com',
      user: {
        _id: 1,
        name: 'andy'
      }
    }
  ]
  return jest.fn(() => Promise.resolve({ data: { images } }))
})
jest.mock('../utils/getWineryData', () => {
  const winery = {
    _id: 1,
    name: 'Doffo',
    avgRating: 20,
    reviewCount: 4,
    hours: {
      Monday: '10-8',
      Tuesday: '10-8',
      Wednesday: '10-8',
      Thursday: '10-8',
      Friday: '10-8',
      Saturday: '10-8',
      Sunday: '10-8',
    },
    wineClubs: [],
    url: 'hello.com',
    phone: '123-456-7890',
  }
  const wines = [
    {
      _id: 1,
      name: '2017 Cab'
    },
    {
      _id: 2,
      name: '2018 Cab'
    }
  ]
  return jest.fn(() => Promise.resolve({ data: {
    wines,
    winery
  } }))
})

afterEach(cleanup)

describe('WineryScreen', () => {
  it('calls getWineryData, getEventsData, getUserRating & getWineryImages on page load', () => {
    render(<WineryScreen navigation={navigation} reviews={reviews} wineryList={wineryList} isAuthenticated={true}/>)

    expect(getWineryData).toHaveBeenCalled()
    expect(getEventsData).toHaveBeenCalled()
    expect(getUserRating).toHaveBeenCalled()
    expect(getWineryImages).toHaveBeenCalled()
  })

  it('renders the BlockHeader component', () => {
    const { queryByTestId } = render(<WineryScreen navigation={navigation} reviews={reviews} wineryList={wineryList} isAuthenticated={true}/>)
    const blockHeader = queryByTestId('block-header')

    expect(blockHeader).not.toBeNull()
  })

  it('renders the post review button if user is authenticated', () => {
    const { queryByTestId } = render(<WineryScreen navigation={navigation} reviews={reviews} wineryList={wineryList} isAuthenticated={true}/>)
    const button = queryByTestId('post-review-btn')

    expect(button).not.toBeNull()
  })

  it('does not render the post review button if user is not authenticated', () => {
    const { queryByTestId } = render(<WineryScreen navigation={navigation} reviews={reviews} wineryList={wineryList} isAuthenticated={false}/>)
    const button = queryByTestId('post-review-btn')

    expect(button).toBeNull()
  })

  // it('calls navigate when clicking on club link or gallery link', () => {
  //   const { queryByTestId } = render(<WineryScreen navigation={navigation} reviews={reviews} wineryList={wineryList} isAuthenticated={false}/>)
  //   const clubLink = queryByTestId('club-link')
  //   const galleryLink = queryByTestId('gallery-link')

  //   fireEvent.press(clubLink)
  //   fireEvent.press(galleryLink)

  //   expect(navigation.navigate).toHaveBeenCalledTimes(1)
  // })
})