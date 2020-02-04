import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginUser } from '../actions/authActions'
import { View, StyleSheet } from 'react-native'
import { Content, Form, Item, Input, Label, Text, Button } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      <Form>
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
          block 
          primary
          onPress={(event) => onSubmitHandler(event)}>
          <Text>Login</Text>
        </Button>
        <Text onPress={() => navigation.navigate('Register')}>Register for an account</Text>
      </Form>
    </Content>
  )
}

const styles = StyleSheet.create({

})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loginUser
}, dispatch)

export default connect(null, mapDispatchToProps)(LoginScreen)