import React from 'react'
import { render } from 'react-native-testing-library'
import ClubColumn from '../components/ClubColumn'

const club = {
  name: "Awesome Wine Club",
  tastings: "12 per month",
  shipments: "3 bottles quarterly",
  winery: "Akash Winery",
  otherBenefits: ["Free stuff", "Cool things", "Parties"],
  avgPrice: "N/A",
  discounts: ["20% off Red Wine", "15% off shirts"]
}

describe('ClubColumn', () => {
  it('returns 0', () => {
    expect(0).toEqual(0)
  })
})