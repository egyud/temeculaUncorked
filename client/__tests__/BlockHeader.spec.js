import React from 'react'
import { render } from 'react-native-testing-library'
import BlockHeader from '../components/BlockHeader'

const data = {
  name: 'Wiens Family Cellars',
  phone: '123-456-7890',
  reviewCount: 12
}

describe('BlockHeader', () => {
  it('UserRating renders if is user is Authenticated', () => {
    const { queryByTestId } = render(<BlockHeader isAuthenticated={true} data={data} userRating={5} rating={3}/>)
    const element = queryByTestId("user-rating-text")

    expect(element).not.toBeNull()
  })

  it('should not render UserRating if user is not authenticated', () => {
    const { queryByTestId } = render(<BlockHeader isAuthenticated={false} data={data} userRating={5} rating={3}/>)
    const element = queryByTestId("user-rating-text")

    expect(element).toBeNull()
  })

  it('should display the correct number of reviews in text', () => {
    const { queryByText } = render(<BlockHeader isAuthenticated={true} data={data} userRating={5} rating={3}/>)
    const element = queryByText("12 Reviews")

    expect(element).not.toBeNull()
  })

  it('should display the passed in phone number', () => {
    const { queryByText } = render(<BlockHeader isAuthenticated={true} data={data} userRating={5} rating={3}/>)
    const element = queryByText("123-456-7890")

    expect(element).not.toBeNull()
  })

  it('should display the winery name', () => {
    const { queryByText } = render(<BlockHeader isAuthenticated={true} data={data} userRating={5} rating={3}/>)
    const element = queryByText("Wiens Family Cellars")

    expect(element).not.toBeNull()
  })
})