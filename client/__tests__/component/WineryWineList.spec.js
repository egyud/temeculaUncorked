import React from 'react'
import { render } from 'react-native-testing-library'
import WineryWineList from '../../components/WineryWineList'

const wineArray = [
  {
    _id: 1,
    name: '2017 Cab'
  },
  {
    _id: 2,
    name: '2018 Cab'
  }
]
const wineryList = [
  {
    _id: 1,
    name: 'Doffo'
  },
  {
    _id: 2,
    name: 'Wiens'
  }
]

describe('WineryWineList', () => {
  it('displays a button for filtering and sorting', () => {
    const { queryByTestId } = render(<WineryWineList wineArray={wineArray} wineryList={wineryList} isAuthenticated={true}/>)
    const filterBtn = queryByTestId('filter-btn')
    const sortBtn = queryByTestId('sort-btn')

    expect(filterBtn).not.toBeNull()
    expect(sortBtn).not.toBeNull()
  })

  it('displays the wineList component', () => {
    const { queryByTestId } = render(<WineryWineList wineArray={wineArray} wineryList={wineryList} isAuthenticated={true}/>)
    const wineList = queryByTestId('wine-list')

    expect(wineList).not.toBeNull()
  })
})