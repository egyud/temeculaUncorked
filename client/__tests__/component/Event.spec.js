import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import Event from '../../components/Event'

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

const navigation = {
  navigate: jest.fn()
}

afterEach(cleanup)

describe('Event', () => {
  it('displays the relevant data for the Event', () => {
    const { queryByText } = render(<Event event={event}/>)
    const title = queryByText('Band playing live')
    const date = queryByText('2020-04-01')
    const price = queryByText('$10')
    const time = queryByText('8pm')
    const attendees = queryByText('0 going')

    expect(title).not.toBeNull()
    expect(date).not.toBeNull()
    expect(price).not.toBeNull()
    expect(time).not.toBeNull()
    expect(attendees).not.toBeNull()
  })

  it('calls navigate when More button is clicked', () => {
    const { queryByTestId } = render(<Event event={event} navigation={navigation}/>)
    const button = queryByTestId('more-btn')

    fireEvent.press(button)

    expect(navigation.navigate).toHaveBeenCalled()
  })
  
})