import React from 'react'
import { render, fireEvent, cleanup } from 'react-native-testing-library'
import { LoginScreen } from '../screens/LoginScreen'

const navigation = {
  navigate: jest.fn()
}

const loginHandler = jest.fn()

afterEach(cleanup)

describe('LoginScreen', () => {
  it('renders inputs for typing email and password', () => {
    const { queryByTestId } = render(<LoginScreen />)
    const emailInput = queryByTestId('email-input')
    const passwordInput = queryByTestId('password-input')

    expect(emailInput).not.toBeNull()
    expect(passwordInput).not.toBeNull()
  })

  it('does not call the loginUser func if there is an empty input field', () => {
    const { queryByTestId } = render(<LoginScreen navigation={navigation} loginUser={loginHandler}/>)
    
    const submitBtn = queryByTestId('submit-btn')
    fireEvent.press(submitBtn)

    expect(loginHandler).not.toHaveBeenCalled()
  })

  it('calls loginUser with email and password submitted', () => {
    const { queryByTestId, queryByText, queryByDisplayValue } = render(<LoginScreen loginUser={loginHandler} navigation={navigation}/>)
    const submitBtn = queryByTestId('submit-btn')
    const emailInput = queryByTestId('email-input')
    const passwordInput = queryByTestId('password-input')
    const emailText = 'john@test.com'
    const passwordText = 'testing123'


    fireEvent.changeText(emailInput, emailText)
    fireEvent.changeText(passwordInput, passwordText)
    fireEvent.press(submitBtn)

    // const element = queryByDisplayValue('john@test.com')
    // expect(element).not.toBeNull()
    // expect(emailInput.props.value).toBe('john@test.com')

    expect(loginHandler).toHaveBeenCalledWith({
      email: emailText,
      password: passwordText
    }, navigation)

  })

  it('navigates to RegisterScreen if link is clicked', () => {
    const { queryByTestId } = render(<LoginScreen navigation={navigation}/>)
    const link = queryByTestId('register-link')

    fireEvent.press(link)
    expect(navigation.navigate).toHaveBeenCalledWith('Register')
  })

  
})