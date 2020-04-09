import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import { ClubScreen } from '../screens/ClubScreen'

const club = {
  name: 'The Club',
  winery: 'Doffo Winery',
  discounts: ['None', 'For', 'You'],
  otherBenefits: ['Maybe', 'Something'],
  tastings: '4 per month',
  shipments: '2 per year',
  avgPrice: '$80'
}

const navigation = {
  navigate: jest.fn(),
  getParam: () => club
}

afterEach(cleanup)

describe('ClubScreen', () => {
  it('displays the clubs info', () => {
    const { queryByText } = render(<ClubScreen navigation={navigation}/>)
    const winery = queryByText(club.winery)
    const name = queryByText(club.name)
    const tastings = queryByText(club.tastings)
    const shipments = queryByText(club.shipments)
    const avgPrice = queryByText(club.avgPrice)

    expect(winery).not.toBeNull()
    expect(name).not.toBeNull()
    expect(tastings).not.toBeNull()
    expect(shipments).not.toBeNull()
    expect(avgPrice).not.toBeNull()
  })

})