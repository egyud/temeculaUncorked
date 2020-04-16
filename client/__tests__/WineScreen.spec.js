import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import { WineScreen } from '../screens/WineScreen'
import getUserWineRating from '../utils/getUserWineRating'
import getRecentRatings from '../utils/getRecentRatings'

afterEach(cleanup)

const user = {
  _id: 1,
  name: 'Andy'
}

const navigation = {
  navigate: jest.fn(),
  getParam: () => {
    const wine = {
      name: '2017 Cab',
      rating: 20,
      ratingCount: 5,
      winery: 'Doffo',
      price: '$55',
      clubPrice: '$45',
      _id: 1,
    }
    return wine
  }
}

jest.mock('../utils/getUserWineRating.js', () => {
  return jest.fn(() => Promise.resolve({ data: { rating: 4 } }))
})

jest.mock('../utils/getRecentRatings.js', () => {
  const recentRatings = [
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
      wineId: 1,
      userId: {
        name: 'john',
        avatar: null,
        userId: 2
      },
      rating: 3
    }
  ]
  return jest.fn(() => Promise.resolve({ data: { ratings: recentRatings } }))
})

describe('WineScreen', () => {
  it('renders the UserRating component if user is authenticated', () => {
    const { queryByTestId } = render(<WineScreen user={user} navigation={navigation} isAuthenticated={true}/>)
    const element = queryByTestId('user-rating')

    expect(element).not.toBeNull()
  })

  it('does not render the UserRating component if user is not authenticated', () => {
    const { queryByTestId } = render(<WineScreen user={user} navigation={navigation} isAuthenticated={false}/>)
    const element = queryByTestId('user-rating')

    expect(element).toBeNull()
  })

  it('calls getRecentRatings and getUserRating on page load', () => {
    render(<WineScreen user={user} navigation={navigation} isAuthenticated={false}/>)

    expect(getRecentRatings).toHaveBeenCalled()
    expect(getUserWineRating).toHaveBeenCalled()
  })

  it('displays a list of recent ratings', () => {
    const { queryByTestId, queryAllByTestId } = render(<WineScreen user={user} navigation={navigation} isAuthenticated={true}/>)
    const list = queryByTestId('recent-ratings')
    // const listItems = queryAllByTestId('rating-item')

    expect(list).not.toBeNull()
    // expect(listItems.length).toBe(2)
  })

  it('displays the relevant data for the wine', () => {
    const { queryByText } = render(<WineScreen user={user} navigation={navigation} isAuthenticated={true}/>)

    const winery = queryByText('Doffo')
    const name = queryByText('2017 Cab')
    const price = queryByText('$55')
    const clubPrice = queryByText('Members price $45')
  
    expect(winery).not.toBeNull()
    expect(name).not.toBeNull()
    expect(price).not.toBeNull()
    expect(clubPrice).not.toBeNull()
  })
})