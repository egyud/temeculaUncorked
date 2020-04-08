import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import { WineCard } from '../components/WineCard'

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
})