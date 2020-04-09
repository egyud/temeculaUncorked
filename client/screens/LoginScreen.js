import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginUser } from '../actions/authActions'
import { View, StyleSheet } from 'react-native'
import { Content, Form, Item, Input, Label, Text, Button } from 'native-base'

const LoginScreen = ({ loginUser, navigation }) => {
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')

  function onSubmitHandler(e) {
    console.log('in onSubmitHandler for login')
    console.log(email)
    console.log(password)
    e.preventDefault()
    loginUser({
      email,
      password
    }, navigation)
  }

  return (
    <Content>
      <Form style={styles.loginForm}>
        <Item stackedLabel>
          <Label>Email</Label>
          <Input
            autoCapitalize="none" 
            onChangeText={(text) => updateEmail(text)}/>
        </Item>
        <Item stackedLabel last>
          <Label>Password</Label>
          <Input
            autoCapitalize="none" 
            secureTextEntry={true}
            onChangeText={(text) => updatePassword(text)}/>
        </Item>
        <Button 
          style={styles.loginBtn}
          onPress={(event) => onSubmitHandler(event)}>
          <Text style={styles.loginBtnText}>Login</Text>
        </Button>
        <Text 
          onPress={() => navigation.navigate('Register')}
          style={styles.registerLink}>Don't have an account? Click here to register</Text>
      </Form>
    </Content>
  )
}

LoginScreen.navigationOptions = {
  title: 'Login',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  loginForm: {
    marginTop: 50
  }, 
  registerLink: {
    paddingTop: 25,
    textAlign: 'center'
  },
  loginBtn: {
    backgroundColor: '#99ff99',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 25,
    borderColor: '#614d36',
    borderWidth: 1
  },
  loginBtnText: {
    color: '#614d36',
    fontWeight: 'bold'
  }
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loginUser
}, dispatch)

export default connect(null, mapDispatchToProps)(LoginScreen)