import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginUser } from '../actions/authActions'
import { StyleSheet } from 'react-native'
import { Content, Form, Item, Input, Label, Text, Button } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export const LoginScreen = ({ loginUser, navigation }) => {
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')

  function onSubmitHandler() {
    if (email.length === 0 || password.length === 0) {
      return
    }
    loginUser({
      email,
      password
    }, navigation)
  }

  return (
    <Content>
      <Form style={styles.loginForm}>
        <Item stackedLabel>
          <Label style={styles.label}>Email</Label>
          <Input
            style={styles.input}
            testID="email-input"
            autoCapitalize="none" 
            onChangeText={(text) => updateEmail(text)}
            value={email}/>
        </Item>
        <Item stackedLabel last>
          <Label style={styles.label}>Password</Label>
          <Input
            style={styles.input}
            testID="password-input"
            autoCapitalize="none" 
            secureTextEntry={true}
            onChangeText={(text) => updatePassword(text)}
            value={password}/>
        </Item>
        <Button
          testID="submit-btn" 
          style={styles.loginBtn}
          onPress={() => onSubmitHandler()}>
          <Text style={styles.loginBtnText}>Login</Text>
        </Button>
        <Text
          testID="register-link" 
          onPress={() => navigation.navigate('Register')}
          style={styles.registerLink}>Don't have an account? Click here to register</Text>
      </Form>
    </Content>
  )
}

LoginScreen.navigationOptions = {
  title: 'Login',
  headerStyle: {
    backgroundColor: '#fcf1d2'
  }
}

const styles = StyleSheet.create({
  loginForm: {
    marginTop: 50,
    alignSelf: 'center',
    width: wp('80%')
  }, 
  registerLink: {
    paddingTop: 25,
    textAlign: 'center',
    fontSize: hp('1.6%')
  },
  loginBtn: {
    backgroundColor: '#fcf1d2',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 25,
    borderColor: '#620014',
    borderWidth: 3
  },
  loginBtnText: {
    color: '#620014',
    fontWeight: 'bold',
    fontSize: hp('1.6%')
  },
  label: {
    fontSize: hp('1.6%')
  },
  input: {
    fontSize: hp('1.6%')
  }
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loginUser
}, dispatch)

export default connect(null, mapDispatchToProps)(LoginScreen)