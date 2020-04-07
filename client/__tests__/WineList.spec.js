import React from 'react'
import { render } from 'react-native-testing-library'
import WineList from '../components/WineList'

const wines = [
  {
    _id: 1,
    wine: 'Cab'
  },
  {
    _id: 2,
    wine: 'Zin'
  }
]

describe('WineList', () => {
  it('renders the same amount of WineCards as there are wines passed as props', () => {
    const { queryAllByTestId } = render(<WineList wines={wines}/>)
    const elements = queryAllByTestId('wine-card')

    expect(elements.length).toEqual(wines.length)
  })
})