import React from 'react'
import { render } from 'react-native-testing-library'
import ClubCard from '../components/ClubCard'

const club = {
  name: "Awesome Wine Club",
  tastings: "12 per month",
  shipments: "3 bottles quarterly",
  winery: "Akash Winery"
}

describe('ClubCard', () => {
  it('displays the name of the club', () => {
    const { queryByText } = render(<ClubCard club={club}/>)
    const element = queryByText('Awesome Wine Club')

    expect(element).not.toBeNull()
  })

  it('displays the name of the winery', () => {
    const { queryByText } = render(<ClubCard club={club}/>)
    const element = queryByText('Akash Winery')

    expect(element).not.toBeNull()
  })

  it('displays the number of shipments', () => {
    const { queryByText } = render(<ClubCard club={club}/>)
    const element = queryByText('3 bottles quarterly')

    expect(element).not.toBeNull()
  })

  it('displays the number of tastings', () => {
    const { queryByText } = render(<ClubCard club={club}/>)
    const element = queryByText('12 per month')

    expect(element).not.toBeNull()
  })
})