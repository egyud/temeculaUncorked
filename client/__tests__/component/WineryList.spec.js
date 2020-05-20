import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import { WineryList } from '../../screens/WineryList'

const list = [
  {
    name: 'Wiens',
    _id: 1
  },
  {
    name: 'Doffo',
    _id: 2
  }
]
const navigation = {
  navigate: jest.fn()
}
const fetchWineries = jest.fn()

afterEach(cleanup)

describe('WineryList', () => {
  it('displays a search bar', () => {
    const { queryByTestId } = render(<WineryList list={list} fetchWineries={fetchWineries}/>)
    const element = queryByTestId('search-bar')

    expect(element).not.toBeNull()
  })

  it('calls fetchWineries on page load', () => {
    render(<WineryList list={list} fetchWineries={fetchWineries}/>)
    expect(fetchWineries).toHaveBeenCalled()
  })

  it('displays a list item for each winery', () => {
    const { queryAllByTestId } = render(<WineryList list={list} fetchWineries={fetchWineries}/>)
    const listItems = queryAllByTestId('list-item')

    expect(listItems.length).toBe(list.length)
  })

  it('calls navigate when clicking on a winery name', () => {
    const { queryAllByTestId } = render(<WineryList list={list} fetchWineries={fetchWineries} navigation={navigation}/>)
    const wineryName = queryAllByTestId('winery-name')

    fireEvent.press(wineryName[0])

    expect(navigation.navigate).toHaveBeenCalled()
  })
})