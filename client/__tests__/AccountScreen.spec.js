import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import { AccountScreen } from '../screens/AccountScreen';

const user = {
  name: 'Andy',
  memberOf: ['Wiens', 'Doffo'],
  following: ['John', 'Sam']
}

afterEach(cleanup)

describe('AccountScreen', () => {
  it('renders the users name', () => {
    const { queryByText } = render(<AccountScreen user={user} userEvents={[]} wineryList={[]}/>)
    const element = queryByText("Andy's account")

    expect(element).not.toBeNull()
  })
  
  it('renders tabs', () => {
    const { queryByTestId } = render(<AccountScreen user={user} userEvents={[]} wineryList={[]}/>)
    const tab = queryByTestId('account-tab')

    expect(tab).not.toBeNull()
  })
})