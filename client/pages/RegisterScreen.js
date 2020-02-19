import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { registerUser } from '../actions/authActions'
import { View, StyleSheet } from 'react-native'
import { Content, Form, Item, Input, Label, Text, Button } from 'native-base'

const RegisterScreen = ({ registerUser, navigation }) => {
  const [email, updateEmail] = useState('')
  const [name, updateName] = useState('')
  const [password, updatePassword] = useState('')
  const [password2, updatePassword2] = useState('')

  function onSubmitHandler(e) {
    e.preventDefault()
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
            autoCapitalize="none" 
            onChangeText={(text) => updateEmail(text)}/>
        </Item>
        <Item stackedLabel>
          <Label>Name(displayed publicly)</Label>
          <Input
            autoCapitalize="none" 
            onChangeText={(text) => updateName(text)}/>
        </Item>
        <Item stackedLabel>
          <Label>Password</Label>
          <Input
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => updatePassword(text)}/>
        </Item>
        <Item stackedLabel last>
          <Label>Enter Password Again</Label>
          <Input
            autoCapitalize="none" 
            secureTextEntry={true}
            onChangeText={(text) => updatePassword2(text)}/>
        </Item>
        <Button 
          style={styles.registerBtn}
          onPress={(event) => onSubmitHandler(event)}>
          <Text style={styles.registerBtnText}>Register</Text>
        </Button>
        <Text
          style={styles.loginLink} 
          onPress={() => navigation.navigate('Login')}>Already have an account? Login here</Text>
      </Form>
    </Content>
  )
}

RegisterScreen.navigationOptions = {
  title: 'Register',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  registerForm: {
    marginTop: 50
  },
  registerBtn: {
    backgroundColor: '#99ff99',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 25,
    borderColor: '#614d36',
    borderWidth: 1
  },
  registerBtnText: {
    color: '#614d36',
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