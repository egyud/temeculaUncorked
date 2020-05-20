import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import { ClubListScreen } from '../../screens/ClubListScreen'

const fetchWineClubs = jest.fn()
const navigation = {
  navigate: jest.fn()
}
const wineClubs = [
  {
    _id: 1,
    name: 'Akash Winery',
    wineClubs: [
      {
        name: "Awesome Wine Club",
        tastings: "12 per month",
        shipments: "3 bottles quarterly",
        _id: 1
      }
    ]
  },
  {
    _id: 2,
    name: "Wiens",
    wineClubs: [
      {
        name: "Second Wine Club",
        tastings: "8 per month",
        shipments: "2 bottles quarterly",
        _id: 2
      },
      {
        name: "Third Wine Club",
        tastings: "12 per month",
        shipments: "1 bottles quarterly",
        _id: 3
      }
    ]
  }
]

afterEach(cleanup)

describe('ClubListScreen', () => {
  it('calls fetchWineClubs on page load', () => {
    render(<ClubListScreen fetchWineClubs={fetchWineClubs} wineClubs={wineClubs} navigation={navigation}/>)

    expect(fetchWineClubs).toHaveBeenCalled()
  })

  it('calls navigate when clicking on the link to compare clubs', () => {
    const { queryByTestId } = render(<ClubListScreen fetchWineClubs={fetchWineClubs} wineClubs={wineClubs} navigation={navigation}/>)
    const link = queryByTestId('compare-link')

    fireEvent.press(link)

    expect(navigation.navigate).toHaveBeenCalled()
  })

  it('displays the club list', () => {
    const { queryByTestId } = render(<ClubListScreen fetchWineClubs={fetchWineClubs} wineClubs={wineClubs} navigation={navigation}/>)
    const list = queryByTestId('club-list')

    expect(list).not.toBeNull()
  })
})