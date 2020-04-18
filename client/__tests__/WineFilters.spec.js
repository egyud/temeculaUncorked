import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import WineFilters from '../components/WineFilters'

const wineryList = [
  {
    _id: 1,
    name: 'Akash'
  },
  {
    _id: 2,
    name: 'Avensole'
  },
  {
    _id: 3,
    name: 'Doffo'
  }
]

afterEach(cleanup)

describe('WineFilters', () => {
  it('renders the winery names as filters if not on the winery screen', () => {
    const { queryByTestId } = render(<WineFilters isWineryScreen={false} wineryList={wineryList}/>)
    const element = queryByTestId('winery-divider')

    expect(element).not.toBeNull()
  })

  it('does not render the winery names as filters if on the winery screen', () => {
    const { queryByTestId } = render(<WineFilters isWineryScreen={true} wineryList={wineryList}/>)
    const element = queryByTestId('winery-divider')

    expect(element).toBeNull()
  })

})