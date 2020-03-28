import React, { useState } from 'react'
import axios from 'axios'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text, Button, Icon, List, ListItem, Form, Input, Label, Item } from 'native-base'

export default Settings = () => {
  const [setting, updateSetting] = useState(null)
  const [newEmail, updateNewEmail] = useState('')
  const [newPassword, updateNewPassword] = useState('')
  const [newLink, updateNewLink] = useState('')
  const [newBio, updateNewBio] = useState('')

  const updateEmailSubmitHandler = () => {
    axios.post('http://localhost:5000/api/users/update-email', {
      newEmail,
      userId: user._id
    })
    .then(res => {
      console.log(res)
      updateNewEmail('')
    })
      .catch(err => console.error(err))
  }

  const updatePasswordSubmitHandler = () => {
    axios.post('http://localhost:5000/api/users/update-password', {
      newPassword,
      userId: user._id
    })
    .then(res => {
      console.log(res)
      updateNewPassword('')
    })
      .catch(err => console.error(err))
  }

  const updateLinkSubmitHandler = () => {
    axios.post('http://localhost:5000/api/users/link', {
      link: newLink,
      userId: user._id
    })
      .then(res => {
        console.log(res)
        updateNewLink('')
      })
      .catch(err => console.error(err))
  }

  const updateBioSubmitHandler = () => {
    axios.post('http://localhost:5000/api/users/bio', {
      bio: newBio,
      userId: user._id
    })
      .then(res => {
        console.log(res)
        updateNewBio('')
      })
      .catch(err => console.error(err))
  }

  if (setting === null) {
    return (
      <View>
        <List>
          <ListItem onPress={() => updateSetting('email')}>
            <Text>Update Email</Text>
          </ListItem>
          <ListItem onPress={() => updateSetting('password')}>
            <Text>Update Password</Text>
          </ListItem>
          <ListItem onPress={() => updateSetting('avatar')}>
            <Text>Update Avatar</Text>
          </ListItem>
          <ListItem onPress={() => updateSetting('bio')}>
            <Text>Update Bio</Text>
          </ListItem>
          <ListItem onPress={() => updateSetting('link')}>
            <Text>Update Homepage Social Link</Text>
          </ListItem>
        </List>
      </View>
    )
  } else {
    let display
    switch (setting) {
      case 'email': 
        display = (
          <Form>
            <Item stackedLabel>
              <Label>Update Email</Label>
              <Input 
                autoCapitalize="none"
                onChangeText={(text) => updateNewEmail(text)}
                value={newEmail}
              />
            </Item>
            <Button
              style={styles.submitBtns}
              primary
              onPress={() => {
                updateEmailSubmitHandler()
                updateSetting(null)
              }}
            >
              <Text style={styles.submitBtnText}>Submit</Text>
            </Button>
          </Form>
        )
        break
      case 'password':
        display = (
          <Form>
            <Item stackedLabel>
              <Label>Update Password</Label>
              <Input 
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(text) => updateNewPassword(text)}
                value={newPassword}
              />
            </Item>
            <Button
              style={styles.submitBtns}
              primary
              onPress={() => {
                updatePasswordSubmitHandler()
                updateSetting(null)
              }}
            >
              <Text style={styles.submitBtnText}>Submit</Text>
            </Button>
          </Form>
        )
        break
      case 'bio': 
        display = (
          <Form>
            <Item stackedLabel>
            <Label>Update Your Bio</Label>
            <Input 
              autoCapitalize="none"
              onChangeText={(text) => updateNewBio(text)}
              value={newBio}
            />
            </Item>
            <Button
              style={styles.submitBtns}
              onPress={() => {
                updateBioSubmitHandler()
                updateSetting(null)
              }}
            >
              <Text style={styles.submitBtnText}>Submit</Text>
            </Button>
          </Form>
        )
        break
      case 'link':
        display = (
          <Form>
            <Item stackedLabel>
            <Label>Update Your Homepage/Social Media Link</Label>
            <Input 
              autoCapitalize="none"
              onChangeText={(text) => updateNewLink(text)}
              value={newLink}
            />
            </Item>
            <Button
              style={styles.submitBtns}
              onPress={() => {
                updateLinkSubmitHandler()
                updateSetting(null)
              }}
            >
              <Text style={styles.submitBtnText}>Submit</Text>
            </Button>
          </Form>
        )
      default:
        display = (
          <View>
            <Text>Error</Text>
          </View>
        )
    }
    return (
      <View>
        <Button onPress={() => updateSetting(null)}>
          <Text>Back to Settings List</Text>
        </Button>
        {display}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  submitBtns: {
    width: '40%',
    justifyContent: 'center',
    backgroundColor: '#99ff99',
    borderColor: '#614d36',
    borderWidth: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25
  },
  submitBtnText: {
    color: '#614d36',
    fontWeight: 'bold'
  }
})