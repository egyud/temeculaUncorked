import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import SortModal from '../../components/SortModal'

afterEach(cleanup)

const props = {
  close: jest.fn(),
  modalVisible: true,
  updateSortBy: jest.fn()
}

describe('SortModal', () => {
  it('calls close function when close button is clicked', () => {
    const { queryByTestId } = render(<SortModal {...props}/>)
    const button = queryByTestId('close-btn')

    fireEvent.press(button)
    expect(props.close).toHaveBeenCalled()
  })

  it('calls updateSortBy and close when a sort value is clicked', () => {
    const { queryAllByTestId } = render(<SortModal {...props}/>)
    const sortValues = queryAllByTestId('sort-value')

    fireEvent.press(sortValues[0])
    expect(props.updateSortBy).toHaveBeenCalled()
    expect(props.close).toHaveBeenCalled()
  })
})