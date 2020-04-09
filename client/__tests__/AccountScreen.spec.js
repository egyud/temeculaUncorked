import React from 'react'
import { render } from 'react-native-testing-library'
import { AccountScreen } from '../screens/AccountScreen';

const user = {
  name: 'Andy',
  memberOf: ['Wiens', 'Doffo'],
  following: ['John', 'Sam']
}

describe('AccountScreen', () => {
  it('renders the users name', () => {
    const { queryByText } = render(<AccountScreen user={user} userEvents={[]} wineryList={[]}/>)
    const element = queryByText("Andy's account")

    expect(element).not.toBeNull()
  })
  
  // it('renders 4 tabs', () => {
  //   const { queryAllByTestId } = render(<AccountScreen user={user} userEvents={[]} wineryList={[]}/>)
  //   const elements = queryAllByTestId('account-tab')

  //   expect(elements.length).toBe(4)
  // })
})