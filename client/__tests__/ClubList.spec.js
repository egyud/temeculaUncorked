import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import ClubList from '../components/ClubList'

const clubs = [
  {
    name: "Awesome Wine Club",
    tastings: "12 per month",
    shipments: "3 bottles quarterly",
    winery: "Akash Winery",
    _id: 1
  },
  {
    name: "Second Wine Club",
    tastings: "8 per month",
    shipments: "2 bottles quarterly",
    winery: "Wiens Family Cellars",
    _id: 2
  },
  {
    name: "Third Wine Club",
    tastings: "12 per month",
    shipments: "1 bottles quarterly",
    winery: "Third Winery",
    _id: 3
  }
]

afterEach(cleanup)

describe('ClubList', () => {
  it('displays a club card for every club that is passed as a prop', () => {
    const { queryAllByTestId } = render(<ClubList clubs={clubs}/>)
    const elements = queryAllByTestId('club-card')

    expect(elements.length).toEqual(clubs.length)
  })
})