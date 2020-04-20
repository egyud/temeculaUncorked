import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { registerUser } from '../actions/authActions'
import { View, StyleSheet } from 'react-native'
import { Content, Form, Item, Input, Label, Text, Button } from 'native-base'

export const RegisterScreen = ({ registerUser, navigation }) => {
  const [email, updateEmail] = useState('')
  const [name, updateName] = useState('')
  const [password, updatePassword] = useState('')
  const [password2, updatePassword2] = useState('')

  function onSubmitHandler() {
    if (email.length === 0 || name.length === 0 || password.length === 0 || password2.length === 0) {
      return
    }
    registerUser({
      email,
      name,
      password,
      password2
    }, navigation)

  }

  return (
    <Content>
      <Form style={styles.registerForm}>
        <Item stackedLabel>
          <Label>Email</Label>
          <Input
            testID="email"
            autoCapitalize="none" 
            onChangeText={(text) => updateEmail(text)}/>
        </Item>
        <Item stackedLabel>
          <Label>Name(displayed publicly)</Label>
          <Input
            testID="name"
            autoCapitalize="none" 
            onChangeText={(text) => updateName(text)}
            value={email}/>
        </Item>
        <Item stackedLabel>
          <Label>Password</Label>
          <Input
            testID="password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => updatePassword(text)}
            value={password}/>
        </Item>
        <Item stackedLabel last>
          <Label>Enter Password Again</Label>
          <Input
            testID="password2"
            autoCapitalize="none" 
            secureTextEntry={true}
            onChangeText={(text) => updatePassword2(text)}
            value={password2}/>
        </Item>
        <Button
          testID="submit" 
          style={styles.registerBtn}
          onPress={() => onSubmitHandler()}>
          <Text style={styles.registerBtnText}>Register</Text>
        </Button>
        <Text
          testID="login-link"
          style={styles.loginLink} 
          onPress={() => navigation.navigate('Login')}>Already have an account? Login here</Text>
      </Form>
    </Content>
  )
}

RegisterScreen.navigationOptions = {
  title: 'Register',
  headerStyle: {
    backgroundColor: '#fcf1d2'
  }
}

const styles = StyleSheet.create({
  registerForm: {
    marginTop: 50
  },
  registerBtn: {
    backgroundColor: '#fcf1d2',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 25,
    borderColor: '#620014',
    borderWidth: 3
  },
  registerBtnText: {
    color: '#620014',
    fontWeight: 'bold'
  },
  loginLink: {
    paddingTop: 25,
    textAlign: 'center'
  },
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  registerUser
}, dispatch)

export default connect(null, mapDispatchToProps)(RegisterScreen)