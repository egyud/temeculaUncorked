import React from 'react'
import { render } from 'react-native-testing-library'
import RatingsList from '../../components/RatingsList'

const ratings = [
  {
    wineId: {
      name: '2017 Cab',
      winery: 'Wiens'
    },
    rating: 4
  },
  {
    wineId: {
      name: '2015 Zin',
      winery: 'Wiens'
    },
    rating: 5
  },
  {
    wineId: {
      name: '2018 Cab',
      winery: 'Doffo'
    },
    rating: 4
  }
]

describe('RatingsList', () => {
  it('should display a message if there are no ratings passed in', () => {
    const { queryByText } = render(<RatingsList />)
    const element = queryByText('This user has no ratings to display')

    expect(element).not.toBeNull()
  })

  it('should display a message if the ratings array passed in is empty', () => {
    const { queryByText } = render(<RatingsList ratings={[]}/>)
    const element = queryByText('This user has no ratings to display')

    expect(element).not.toBeNull()
  })

  it('should render the same number of ListItems as there are ratings passed in', () => {
    const { queryAllByTestId } = render(<RatingsList ratings={ratings}/>)
    const elements = queryAllByTestId('ratings-list-item')

    expect(elements.length).toEqual(ratings.length)
  })
})