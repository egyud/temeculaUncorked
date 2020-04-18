import React from 'react'
import { render, cleanup, waitForElement } from 'react-native-testing-library'
import EventsScreen from '../screens/EventsScreen'
import getEvents from '../utils/getEvents'

jest.mock('../utils/getEvents.js', () => {
  const events = [
    {
      title: "Band playing live",
      winery: "Akash Winery",
      date: "2020-04-01",
      time: "8pm",
      description: "This is a description.",
      price: "$10",
      membersOnly: false,
      adultsOnly: true,
      attending: [],
      _id: 1
    },
    {
      title: "Band playing live",
      winery: "Akash Winery",
      date: "2020-04-01",
      time: "8pm",
      description: "This is a description.",
      price: "$10",
      membersOnly: false,
      adultsOnly: true,
      attending: [],
      _id: 2
    },
    {
      title: "Band playing live",
      winery: "Akash Winery",
      date: "2020-04-01",
      time: "8pm",
      description: "This is a description.",
      price: "$10",
      membersOnly: false,
      adultsOnly: true,
      attending: [],
      _id: 3
    }
  ]
  
  return jest.fn(() => Promise.resolve({ data: { events } }))
})

afterEach(cleanup)

describe('EventsScreen', () => {
  it('renders the EventList component', () => {
    const { queryByTestId } = render(<EventsScreen />)
    const eventList = queryByTestId('event-list')
    const errorMsg = queryByTestId('no-events-msg')

    waitForElement(eventList)
    expect(errorMsg).not.toBeNull()
  })

  it('calls getEvents func on page load', () => {
    render(<EventsScreen />)
    
    expect(getEvents).toHaveBeenCalled()
  })
})