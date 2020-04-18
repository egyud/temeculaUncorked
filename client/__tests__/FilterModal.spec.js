import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import FilterModal from '../components/FilterModal'

afterEach(cleanup)

const props = {
  close: jest.fn(),
  filterWines: jest.fn(),
  addToFilters: jest.fn(),
  isWineryScreen: false,
  modalVisible: true,
  wineryList: [
    {
      _id: 1,
      name: 'Doffo',
    },
    {
      _id: 2,
      name: 'Wiens'
    }
  ]
}

describe('FilterModal', () => {
  it('renders a Filter and Close button', () => {
    const { queryByTestId } = render(<FilterModal {...props}/>)
    const filterBtn = queryByTestId('filter-btn')
    const closeBtn = queryByTestId('close-btn')

    expect(filterBtn).not.toBeNull()
    expect(closeBtn).not.toBeNull()
  })

  it('renders the wineFilters component', () => {
    const { queryByTestId } = render(<FilterModal {...props}/>)
    const wineFilters = queryByTestId('wine-filters')

    expect(wineFilters).not.toBeNull()
  })

  it('clicking on close button should call close function', () => {
    const { queryByTestId } = render(<FilterModal {...props} />)
    const closeBtn = queryByTestId('close-btn')

    fireEvent.press(closeBtn)

    expect(props.close).toHaveBeenCalled()
  })

  it('clicking on filter button should call filterWines function', () => {
    const { queryByTestId } = render(<FilterModal {...props} />)
    const filterBtn = queryByTestId('filter-btn')

    fireEvent.press(filterBtn)

    expect(props.filterWines).toHaveBeenCalled()
  })

})