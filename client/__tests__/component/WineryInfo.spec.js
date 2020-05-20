import React from 'react'
import { render } from 'react-native-testing-library'
import WineryInfo from '../../components/WineryInfo'

const info = {
  address: '123 Fake Street',
  hours: {
    Monday: '1',
    Tuesday: '2'
  },
  url: 'www.winery.com'
}

describe('WineryInfo', () => {
  it('renders relevant data passed to it', () => {
    const { queryByText } = render(<WineryInfo info={info}/>)
    const url = queryByText('www.winery.com')
    const address = queryByText(info.address)

    expect(url).not.toBeNull()
    expect(address).not.toBeNull()
  })

})