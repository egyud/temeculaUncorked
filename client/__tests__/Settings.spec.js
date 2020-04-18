import React from 'react'
import { render, cleanup, fireEvent, waitForElement } from 'react-native-testing-library'
import Settings from '../components/Settings'
import updateEmail from '../utils/updateEmail'
import updatePassword from '../utils/updatePassword'
import updateLink from '../utils/updateLink'
import updateBio from '../utils/updateBio'

afterEach(cleanup)

jest.mock('../utils/updateEmail', () => {
  return jest.fn(() => Promise.resolve({ data: {} }))
})

jest.mock('../utils/updatePassword', () => {
  return jest.fn(() => Promise.resolve({ data: {} }))
})

jest.mock('../utils/updateLink', () => {
  return jest.fn(() => Promise.resolve({ data: {} }))
})

jest.mock('../utils/updateBio', () => {
  return jest.fn(() => Promise.resolve({ data: {} }))
})

const user = {
  _id: 1,
  name: 'andy'
}

describe('Settings', () => {
  it('displays a list of setting options on page load', () => {
    const { queryByTestId } = render(<Settings user={user}/>)
    const email = queryByTestId('email-setting')
    const pw = queryByTestId('password-setting')
    const avatar = queryByTestId('avatar-setting')
    const bio = queryByTestId('bio-setting')
    const link = queryByTestId('link-setting')

    expect(email).not.toBeNull()
    expect(pw).not.toBeNull()
    expect(avatar).not.toBeNull()
    expect(bio).not.toBeNull()
    expect(link).not.toBeNull()
  })

  it('displays a form for updating after clicking on a settings option', () => {
    const { queryByTestId } = render(<Settings user={user}/>)
    const email = queryByTestId('email-setting')
    fireEvent.press(email)
    const form = queryByTestId('email-form')
    expect(form).not.toBeNull()
  })

  it('calls updateEmail function when clicking on the email form submit button', () => {
    const { queryByTestId } = render(<Settings user={user}/>)
    const email = queryByTestId('email-setting')
    fireEvent.press(email)
    const button = queryByTestId('submit-btn')
    fireEvent.press(button)
    expect(updateEmail).toHaveBeenCalled()
  })

  it('calls updatePassword function when clicking on the password form submit button', () => {
    const { queryByTestId } = render(<Settings user={user}/>)
    const password = queryByTestId('password-setting')
    fireEvent.press(password)
    const button = queryByTestId('submit-btn')
    fireEvent.press(button)
    expect(updatePassword).toHaveBeenCalled()
  })

  it('calls updateBio function when clicking on the bio form submit button', () => {
    const { queryByTestId } = render(<Settings user={user}/>)
    const bio = queryByTestId('bio-setting')
    fireEvent.press(bio)
    const button = queryByTestId('submit-btn')
    fireEvent.press(button)
    expect(updateBio).toHaveBeenCalled()
  })

})