import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import { WineSearch } from '../screens/WineSearch'

afterEach(cleanup)

const fetchWineList = jest.fn()
const wineArray = [
  {
    _id: 1,
    name: '2016 Cab',
    winery: 'Doffo',
    price: '$25',
    clubPrice: '$20',
    category: 'Red',
    avgRating: 30,
    ratingCount: 7
  },
  {
    _id: 2,
    name: '2016 Syrah',
    winery: 'Doffo',
    price: '$35',
    clubPrice: '$30',
    category: 'Red',
    avgRating: 28,
    ratingCount: 8
  }
]
const navigation = {
  navigate: jest.fn()
}
const wineryList = [
  {
    _id: 1,
    name: 'doffo'
  },
  {
    _id: 2,
    name: 'wiens'
  }
]

describe('WineSearch', () => {
  it('displays buttons for filtering and sorting wines', () => {
    const { queryByText } = render(<WineSearch wineArray={wineArray} fetchWineList={fetchWineList} navigation={navigation} wineryList={wineryList}/>)
    const sortBtn = queryByText('Sort Wines')
    const filterBtn = queryByText('Filter Wines')

    expect(sortBtn).not.toBeNull()
    expect(filterBtn).not.toBeNull()
  })

  it('calls fetchWineList on page load', () => {
    render(<WineSearch wineArray={wineArray} fetchWineList={fetchWineList} navigation={navigation} wineryList={wineryList}/>)

    expect(fetchWineList).toHaveBeenCalled()
  })

  it('displays the WineList component', () => {
    const { queryByTestId } = render(<WineSearch wineArray={wineArray} fetchWineList={fetchWineList} navigation={navigation} wineryList={wineryList}/>)
    const wineList = queryByTestId('wine-list')

    expect(wineList).not.toBeNull()
  })
})