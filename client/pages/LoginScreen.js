import React, { useState } from 'react'
import { View, StyleSheet } from 'react-redux'
import { Content, Form, Item, Input, Label, Text, Button } from 'native-base'

export default LoginScreen = () => {
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')

  function emailChangeHandler(e) {
    e.preventDefault()
    e.persist()
    updateEmail(e.target.value)
  }

  function passwordChangeHandler(e) {
    e.preventDefault()
    e.persist()
    updatePassword(e.target.value)
  }

  return (
    <Content>
      <Form>
        <Item stackedLabel>
          <Label>Email</Label>
          <Input onChange={(event) => emailChangeHandler(event)}/>
        </Item>
        <Item stackedLabel last>
          <Label>Password</Label>
          <Input onChange={(event) => passwordChangeHandler(event)}/>
        </Item>
        <Button block primary>
          <Text>Login</Text>
        </Button>
      </Form>
    </Content>
  )
}

const styles = StyleSheet.create({

})
