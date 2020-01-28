import React, { useState } from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-redux'
import { Content, Form, Item, Input, Label, Text, Button } from 'native-base'

export default LoginScreen = () => {
  const [email, updateEmail] = useState('')
  const [name, updateName] = useState('')
  const [password, updatePassword] = useState('')
  const [password2, updatePassword2] = useState('')

  function emailChangeHandler(e) {
    e.preventDefault()
    e.persist()
    updateEmail(e.target.value)
  }

  function nameChangeHandler(e) {
    e.preventDefault()
    e.persist()
    updateName(e.target.value)
  }

  function passwordChangeHandler(e) {
    e.preventDefault()
    e.persist()
    updatePassword(e.target.value)
  }

  function password2ChangeHandler(e) {
    e.preventDefault()
    e.persist()
    updatePassword2(e.target.value)
  }

  return (
    <Content>
      <Form>
        <Item stackedLabel>
          <Label>Email</Label>
          <Input onChange={(event) => emailChangeHandler(event)}/>
        </Item>
        <Item stackedLabel>
          <Label>Name(displayed publicly)</Label>
          <Input onChange={(event) => nameChangeHandler(event)}/>
        </Item>
        <Item stackedLabel>
          <Label>Password</Label>
          <Input onChange={(event) => passwordChangeHandler(event)}/>
        </Item>
        <Item stackedLabel last>
          <Label>Enter Password Again</Label>
          <Input onChange={(event) => password2ChangeHandler(event)}/>
        </Item>
        <Button block primary>
          <Text>Register</Text>
        </Button>
      </Form>
    </Content>
  )
}

const styles = StyleSheet.create({

})
