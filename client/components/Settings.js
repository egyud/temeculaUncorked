import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text, Button, Icon, List, ListItem, Form, Input, Label, Item } from 'native-base'
import updateEmail from '../utils/updateEmail'
import updatePassword from '../utils/updatePassword'
import updateLink from '../utils/updateLink'
import updateBio from '../utils/updateBio'

export default Settings = ({ user }) => {
  const [setting, updateSetting] = useState(null)
  const [newEmail, updateNewEmail] = useState('')
  const [newPassword, updateNewPassword] = useState('')
  const [newLink, updateNewLink] = useState('')
  const [newBio, updateNewBio] = useState('')

  const updateEmailSubmitHandler = () => {
    updateEmail(newEmail, user._id)
      .then(res => {
        console.log(res)
        updateNewEmail('')
      })
      .catch(err => console.error(err))
  }

  const updatePasswordSubmitHandler = () => {
    updatePassword(newPassword, user._id)
      .then(res => {
        console.log(res)
        updateNewPassword('')
      })
      .catch(err => console.error(err))
  }

  const updateLinkSubmitHandler = () => {
    updateLink(newLink, user._id)
      .then(res => {
        console.log(res)
        updateNewLink('')
      })
      .catch(err => console.error(err))
  }

  const updateBioSubmitHandler = () => {
    updateBio(newBio, user._id)
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
          <ListItem 
            testID="email-setting"
            onPress={() => updateSetting('email')}>
            <Text>Update Email</Text>
          </ListItem>
          <ListItem 
            testID="password-setting"
            onPress={() => updateSetting('password')}>
            <Text>Update Password</Text>
          </ListItem>
          <ListItem 
            testID="avatar-setting"
            onPress={() => updateSetting('avatar')}>
            <Text>Update Avatar</Text>
          </ListItem>
          <ListItem 
            testID="bio-setting"
            onPress={() => updateSetting('bio')}>
            <Text>Update Bio</Text>
          </ListItem>
          <ListItem 
            testID="link-setting"
            onPress={() => updateSetting('link')}>
            <Text>Update Homepage/Social Link</Text>
          </ListItem>
        </List>
      </View>
    )
  } else {
    let display
    switch (setting) {
      case 'email': 
        display = (
          <Form testID="email-form">
            <Item stackedLabel>
              <Label>Update Email</Label>
              <Input 
                autoCapitalize="none"
                onChangeText={(text) => updateNewEmail(text)}
                value={newEmail}
              />
            </Item>
            <Button
              testID="submit-btn"
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
              testID="submit-btn"
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
              testID="submit-btn"
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
              testID="submit-btn"
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
        <Button 
          style={styles.backBtn}
          onPress={() => updateSetting(null)}>
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
    backgroundColor: '#620014',
    borderColor: '#620014',
    borderWidth: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25
  },
  submitBtnText: {
    color: '#fcf1d2',
    fontWeight: 'bold'
  },
  backBtn: {
    backgroundColor: '#620014',
    justifyContent: 'center'
  }
})