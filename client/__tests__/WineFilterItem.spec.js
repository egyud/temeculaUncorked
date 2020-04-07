import React from 'react'
import { render } from 'react-native-testing-library'
import WineFilterItem from '../components/WineFilterItem'

describe('WineFilterItem', () => {
  it('renders the text passed as prop', () => {
    const { queryByText } = render(<WineFilterItem text='Hello World'/>)
    const element = queryByText('Hello World')

    expect(element).not.toBeNull()
  })
})