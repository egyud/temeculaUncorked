import React from 'react'
import { render, fireEvent, cleanup } from 'react-native-testing-library'
import { ClubComparison } from '../screens/ClubComparison'

const props = {
  wineClubs: [
    {
      name: 'winery1',
      wineClubs: [
        {
          name: 'club1',
          _id: 1,
          shipments: '3',
          tastings: '4',
          discounts: [1, 2],
          otherBenefits: [3, 4]
        },
        {
          name: 'club2',
          _id: 2,
          shipments: '3',
          tastings: '4',
          discounts: [1, 2],
          otherBenefits: [3, 4]
        },
      ]
    },
    {
      name: 'winery2',
      wineClubs: [
        {
          name: 'club3',
          _id: 3,
          shipments: '3',
          tastings: '4',
          discounts: [1, 2],
          otherBenefits: [3, 4]
        },
        {
          name: 'club4',
          _id: 4,
          shipments: '3',
          tastings: '4',
          discounts: [1, 2],
          otherBenefits: [3, 4]
        },
      ]
    },
  ],
  fetchWineClubs: jest.fn(),
  navigation: {
    navigate: jest.fn()
  }
}

afterEach(cleanup)

describe('ClubComparison', () => {
  it('renders a spinner if there are no clubs passed in', () => {
    const { queryByTestId } = render(<ClubComparison wineClubs={[]} fetchWineClubs={jest.fn()}/>)
    const element = queryByTestId('spinner')

    expect(element).not.toBeNull()
  })

  it('calls the navigate function when clicking on link', () => {
    const { queryByTestId } = render(<ClubComparison {...props}/>)
    const element = queryByTestId('compare-link')
    expect(element).not.toBeNull()

    fireEvent.press(element)

    expect(props.navigation.navigate).toHaveBeenCalled()
  })

  // it('opens the modal when clicking on select club button', () => {
  //   const { queryByTestId } = render(<ClubComparison {...props}/>)
  //   const element = queryByTestId('open-modal-1')
  //   fireEvent.press(element)
    
  // })
})