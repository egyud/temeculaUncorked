import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import ActivityFeed from '../components/ActivityFeed'

afterEach(cleanup)

describe('ActivityFeed', () => {
  it('calls navigate function when clicked', () => {
    const nav = {
      navigate: jest.fn()
    }
    
    const { queryByTestId } = render(<ActivityFeed navigation={nav}/>)
    const element = queryByTestId('activity-feed-item')
    fireEvent.press(element)

    expect(nav.navigate).toHaveBeenCalledTimes(1)
  })
})