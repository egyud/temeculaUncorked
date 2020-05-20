import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import ClubColumn from '../../components/ClubColumn'

const club = {
  name: "Awesome Wine Club",
  tastings: "12 per month",
  shipments: "3 bottles quarterly",
  winery: "Akash Winery",
  otherBenefits: ["Free stuff", "Cool things", "Parties"],
  avgPrice: "N/A",
  discounts: ["20% off Red Wine", "15% off shirts"]
}

afterEach(cleanup)

describe('ClubColumn', () => {
  it('renders 7 ClubColumnItem components', () => {
    const { queryAllByTestId } = render(<ClubColumn club={club}/>)
    const items = queryAllByTestId('column-item')

    expect(items.length).toBe(7)
  })
})