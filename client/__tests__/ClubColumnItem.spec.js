import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import ClubColumnItem from '../components/ClubColumnItem'

afterEach(cleanup)

describe('ClubColumnItem', () => {
  it('displays the title and body passed to it', () => {
    const { queryByText } = render(<ClubColumnItem title='Winery' number={1} body="Doffo"/>)
    const title = queryByText('Winery')
    const body = queryByText('Doffo')

    expect(title).not.toBeNull()
    expect(body).not.toBeNull()
  })
})