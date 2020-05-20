import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import UserRating from '../../components/UserRating'

describe('UserRating', () => {
  it('should render a Rating component', () => {
    const { queryByTestId } = render(<UserRating value={4} size={20}/>)
    const element = queryByTestId('rating')

    expect(element).not.toBeNull()
  })

  it('should call rateFunc when clicked', () => {
    const rate = jest.fn()
    const { queryByTestId } = render(<UserRating value={4} size={20} rateFunc={() => rate()}/>)
    const element = queryByTestId('rating')

    fireEvent(element, 'onFinishRating')
    expect(rate).toHaveBeenCalled()
  })
})