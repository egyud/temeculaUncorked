import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import UserRating from '../components/UserRating'

describe('UserRating', () => {
  it('should render a Rating component', () => {
    const { queryByTestId } = render(<UserRating value={4} size={20}/>)
    const element = queryByTestId('rating')

    expect(element).not.toBeNull()
  })

  // it('should call rateFunc when clicked', () => {
  //   const rateMock = jest.fn()
  //   const { queryByTestId } = render(<UserRating value={4} size={20} rateFunc={() => rateMock()}/>)
  //   const element = queryByTestId('rating')


  //   fireEvent.press(element)
  //   expect(rateMock).toHaveBeenCalledTimes(3)
  // })
})