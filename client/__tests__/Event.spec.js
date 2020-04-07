import React from 'react'
import { render } from 'react-native-testing-library'
import Event from '../components/Event'

const event = {
  title: "Band playing live",
  winery: "Akash Winery",
  date: "2020-04-01",
  time: "8pm",
  description: "This is a description.",
  price: "$10",
  membersOnly: false,
  adultsOnly: true,
  attending: []
}

describe('Event', () => {
  it('should render the event title passed in', () => {
    const { queryByText } = render(<Event event={event}/>)
    const element = queryByText('Band playing live')

    expect(element).not.toBeNull()

  })

  it('should render the event date passed in', () => {
    const { queryByText } = render(<Event event={event}/>)
    const element = queryByText('2020-04-01')

    expect(element).not.toBeNull()

  })

  it('should render the event price passed in', () => {
    const { queryByText } = render(<Event event={event}/>)
    const element = queryByText('$10')

    expect(element).not.toBeNull()
  })

  it('should render the event time passed in', () => {
    const { queryByText } = render(<Event event={event}/>)
    const element = queryByText('8pm')

    expect(element).not.toBeNull()
  })

  it('should render the correct number of attendees', () => {
    const { queryByText } = render(<Event event={event}/>)
    const element = queryByText('0 going')

    expect(element).not.toBeNull()
  })
})