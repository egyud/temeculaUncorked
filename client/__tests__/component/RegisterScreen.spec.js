import React from 'react'
import { render, cleanup, fireEvent } from 'react-native-testing-library'
import { RegisterScreen } from '../../screens/RegisterScreen'

const navigation = {
  navigate: jest.fn()
}

const registerHandler = jest.fn()

afterEach(cleanup)

describe('RegisterScreen', () => {
  it('renders inputs for typing email, password and name', () => {
    const { queryByTestId } = render(<RegisterScreen />)
    const emailInput = queryByTestId('email')
    const nameInput = queryByTestId('name')
    const passwordInput = queryByTestId('password')
    const password2Input = queryByTestId('password2')

    expect(emailInput).not.toBeNull()
    expect(nameInput).not.toBeNull()
    expect(passwordInput).not.toBeNull()
    expect(password2Input).not.toBeNull()
  })

  it('updates text in email input', () => {
    const { queryByTestId, queryByDisplayValue } = render(<RegisterScreen />)
    const emailInput = queryByTestId('email')
    const emailText = 'andy@test.com'
    fireEvent.changeText(emailInput, emailText)
    
    console.log(emailInput.props)
    expect(queryByDisplayValue(emailText)).not.toBeNull()
  }) 

  it('navigates to LoginScreen if link is clicked', () => {
    const { queryByTestId } = render(<RegisterScreen navigation={navigation}/>)
    const link = queryByTestId('login-link')

    fireEvent.press(link)

    expect(navigation.navigate).toHaveBeenCalledWith('Login')
  })

  it('does not call the registerUser func if there is an empty input field', () => {
    const { queryByTestId } = render(<RegisterScreen registerUser={registerHandler} navigation={navigation}/>)
    const submitButton = queryByTestId('submit')
    fireEvent.press(submitButton)

    expect(registerHandler).not.toHaveBeenCalled()
  })

  it('calls registerUser handler with the data entered', () => {
    const { queryByTestId } = render(<RegisterScreen registerUser={registerHandler} navigation={navigation}/>)
    const emailText = 'andy@test.com'
    const nameText = 'andy'
    const passwordText = 'testing123'
    const password2Text = 'testing123'
    const emailInput = queryByTestId('email')
    const nameInput = queryByTestId('name')
    const passwordInput = queryByTestId('password')
    const password2Input = queryByTestId('password2')
    const submitButton = queryByTestId('submit')

    fireEvent.changeText(emailInput, emailText)
    fireEvent.changeText(nameInput, nameText)
    fireEvent.changeText(passwordInput, passwordText)
    fireEvent.changeText(password2Input, password2Text)
    fireEvent.press(submitButton)

    expect(registerHandler).toHaveBeenCalled()
  })
})