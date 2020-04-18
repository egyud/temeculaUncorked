import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import WineCard from '../components/WineCard'
import postRating from '../utils/postRating'

const wine = {
  name: '2017 Syrah',
  rating: 5,
  winery: 'Doffo',
  ratingCount: 12,
  price: '$50',
  _id: 1
}

const user = {
  _id: 1,
  name: 'andy',
  email: 'andy@test.com',
}

jest.mock('../utils/postRating.js', () => {
  return jest.fn(() => Promise.resolve({ data }))
})

afterEach(cleanup)

describe('WineCard', () => {
  it('renders the name of the winery', () => {
    const { queryByText } = render(<WineCard user={user} isAuthenticated={true} wine={wine}/>)
    const element = queryByText('Doffo')

    expect(element).not.toBeNull()
  })

  it('renders the name of the wine', () => {
    const { queryByText } = render(<WineCard user={user} isAuthenticated={true} wine={wine}/>)
    const element = queryByText('2017 Syrah')

    expect(element).not.toBeNull()
  })

  it('renders the rating count', () => {
    const { queryByText } = render(<WineCard user={user} isAuthenticated={true} wine={wine}/>)
    const element = queryByText('12 ratings')

    expect(element).not.toBeNull()
  })

  it('calls the navigation function when More button is clicked', () => {
    const nav = {
      navigate: jest.fn()
    }
    const { queryByTestId } = render(<WineCard user={user} isAuthenticated={true} wine={wine} navigation={nav}/>)
    const element = queryByTestId('more-button')
    fireEvent.press(element)

    expect(nav.navigate).toHaveBeenCalledTimes(1)
  })
})