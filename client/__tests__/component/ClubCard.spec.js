import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import ClubCard from '../../components/ClubCard'

const club = {
  name: "Awesome Wine Club",
  tastings: "12 per month",
  shipments: "3 bottles quarterly",
  winery: "Akash Winery"
}

const navigation = {
  navigate: jest.fn()
}

afterEach(cleanup)

describe('ClubCard', () => {
  it('displays the relevant data for the club', () => {
    const { queryByText } = render(<ClubCard club={club}/>)
    const name = queryByText('Awesome Wine Club')
    const winery = queryByText('Akash Winery')
    const shipments = queryByText('3 bottles quarterly')
    const tastings = queryByText('12 per month')

    expect(name).not.toBeNull()
    expect(winery).not.toBeNull()
    expect(shipments).not.toBeNull()
    expect(tastings).not.toBeNull()
  })

  it('calls navigate when clicking on More button', () => {
    const { queryByTestId } = render(<ClubCard navigation={navigation} club={club}/>)
    const button = queryByTestId('more-btn')

    fireEvent.press(button)

    expect(navigation.navigate).toHaveBeenCalled()
  })
})