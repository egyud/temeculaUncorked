import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import HomePageLink from '../components/HomePageLink/HomePageLink'

afterEach(cleanup)

describe('HomePageLink', () => {
  it('displays the passed-in link text', () => {
    const { queryByText } = render(<HomePageLink linkText="Register"/>)
    expect(queryByText('Register')).not.toBeNull()
  })

  it('calls navigate when clicked', () => {
    const navHandler = jest.fn()
    const { queryByTestId } = render(<HomePageLink linkText="Register" nav={navHandler}/>)
    const element = queryByTestId('home-page-link')

    fireEvent.press(element)
    expect(navHandler).toHaveBeenCalledTimes(1)
  })
})