import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import FollowingWineryList from '../components/FollowingWineryList'

const wineries = [
  {
    name: 'Wiens',
    _id: 1
  },
  {
    name: 'Doffo',
    _id: 2
  }
]

afterEach(cleanup)

describe('FollowingList', () => {
  it('should display a message if there are no wineries passed in', () => {
    const { queryByText } = render(<FollowingWineryList />)
    const element = queryByText('You are not following any wineries.')

    expect(element).not.toBeNull()
  })

  it('should display a message if the wineries array is empty', () => {
    const { queryByText } = render(<FollowingWineryList wineries={[]}/>)
    const element = queryByText('You are not following any wineries.')

    expect(element).not.toBeNull()
  })

  it('should render the same number of ListItems as there are wineries passed in', () => {
    const { queryAllByTestId } = render(<FollowingWineryList wineries={wineries}/>)
    const elements = queryAllByTestId('following-winery-item')

    expect(elements.length).toEqual(wineries.length)
  })
})