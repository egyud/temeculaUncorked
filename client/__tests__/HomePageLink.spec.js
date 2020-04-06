import React from 'react'
import { render } from 'react-native-testing-library'
import HomePageLink from '../components/HomePageLink/HomePageLink'

describe('HomePageLink', () => {
  it('displays the passed-in link text', () => {
    const { queryByText } = render(<HomePageLink linkText="Register"/>)
    expect(queryByText('Register')).not.toBeNull()
  })
})