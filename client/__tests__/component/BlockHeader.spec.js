import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import BlockHeader from '../../components/BlockHeader'

const data = {
  name: 'Wiens Family Cellars',
  phone: '123-456-7890',
  reviewCount: 12
}

afterEach(cleanup)

describe('BlockHeader', () => {
  it('renders UserRating if user is Authenticated', () => {
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

  it('should display the passed in data', () => {
    const { queryByText } = render(<BlockHeader isAuthenticated={true} data={data} userRating={5} rating={3}/>)
    const phone = queryByText("123-456-7890")
    const winery = queryByText("Wiens Family Cellars")

    expect(phone).not.toBeNull()
    expect(winery).not.toBeNull()
  })
})