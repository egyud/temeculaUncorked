import React from 'react'
import { render } from 'react-native-testing-library'
import WineryInfo from '../components/WineryInfo'

const info = {
  address: '123 Fake Street',
  hours: {
    Monday: '1',
    Tuesday: '2'
  },
  url: 'www.winery.com'
}

describe('WineryInfo', () => {
  it('renders the url passed to it', () => {
    const { queryByText } = render(<WineryInfo info={info}/>)
    const element = queryByText('www.winery.com')

    expect(element).not.toBeNull()
  })

  it('renders the address of the winery', () => {
    const { queryByText } = render(<WineryInfo info={info}/>)
    const element = queryByText(info.address)

    expect(element).not.toBeNull()
  })
})