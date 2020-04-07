import React from 'react'
import { render } from 'react-native-testing-library'
import EventList from '../components/EventList'

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

describe('EventList', () => {
  it('should display a message if there are no events passed in', () => {
    const { queryByText } = render(<EventList />)
    const element = queryByText('No events to display')

    expect(element).not.toBeNull()
  })

  it('should not display the no events message if there are events', () => {
    const { queryByText } = render(<EventList events={events}/>)
    const element = queryByText('No events to display')

    expect(element).toBeNull()
  })

  it('should render the same number of Event cards as there are events passed in as props', () => {
    const { queryAllByTestId } = render(<EventList events={events}/>)
    const elements = queryAllByTestId('event-card')

    expect(elements.length).toEqual(events.length)
  })
})