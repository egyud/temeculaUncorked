import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button, List, ListItem, Form, Input, Label, Item } from 'native-base'
import updateEmail from '../utils/updateEmail'
import updatePassword from '../utils/updatePassword'
import updateLink from '../utils/updateLink'
import updateBio from '../utils/updateBio'
import deleteUser from '../utils/deleteUser'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { showMessage } from 'react-native-flash-message'

export default Settings = ({ user, navigation }) => {
  const [setting, updateSetting] = useState(null)
  const [newEmail, updateNewEmail] = useState('')
  const [newPassword, updateNewPassword] = useState('')
  const [newLink, updateNewLink] = useState('')
  const [newBio, updateNewBio] = useState('')
  const [deleteEmail, updateDeleteEmail] = useState('')

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

  const deleteAccountHandler = () => {
    if (user.email === deleteEmail) {
      deleteUser(user._id)
        .then(res => {
          navigation.navigate('Home')
          showMessage({
            message: 'Your account was successfully deleted',
            type: 'success'
          })
        })
        .catch(err => console.error(err))
    } else {
      showMessage({
        message: 'You did not enter the correct email address. Please try again.',
        type: 'danger'
      })
    }
  }

  if (setting === null) {
    return (
      <View>
        <List>
          <ListItem 
            testID="email-setting"
            onPress={() => updateSetting('email')}>
            <Text style={styles.text}>Update Email</Text>
          </ListItem>
          <ListItem 
            testID="password-setting"
            onPress={() => updateSetting('password')}>
            <Text style={styles.text}>Update Password</Text>
          </ListItem>
          <ListItem 
            testID="avatar-setting"
            onPress={() => updateSetting('avatar')}>
            <Text style={styles.text}>Update Avatar</Text>
          </ListItem>
          <ListItem 
            testID="bio-setting"
            onPress={() => updateSetting('bio')}>
            <Text style={styles.text}>Update Bio</Text>
          </ListItem>
          <ListItem 
            testID="link-setting"
            onPress={() => updateSetting('link')}>
            <Text style={styles.text}>Update Homepage/Social Link</Text>
          </ListItem>
          <ListItem
            onPress={() => updateSetting('delete')}>
            <Text style={styles.text}>Delete Account</Text>
          </ListItem>
        </List>
      </View>
    )
  } else {
    let display
    switch (setting) {
      case 'email': 
        display = (
          <Form style={styles.form} testID="email-form">
            <Item stackedLabel>
              <Label style={styles.text}>Update Email</Label>
              <Input
                style={styles.text} 
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
          <Form style={styles.form}>
            <Item stackedLabel>
              <Label style={styles.text}>Update Password</Label>
              <Input
                style={styles.text} 
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
          <Form style={styles.form}>
            <Item stackedLabel>
            <Label style={styles.text}>Update Your Bio</Label>
            <Input
              style={styles.text} 
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
          <Form style={styles.form}>
            <Item stackedLabel>
            <Label style={styles.text}>Update Your Homepage/Social Media Link</Label>
            <Input
              style={styles.text} 
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
        break
      case 'delete':
        display = (
          <View>
            <Text style={styles.text}>This cannot be undone</Text>
            <Item stackedLabel>
              <Label style={styles.text}>Confirm your email address</Label>
              <Input
                style={styles.text} 
                autoCapitalize="none"
                onChangeText={(text) => updateDeleteEmail(text)}
                value={deleteEmail}
              />
            </Item>
            <Button 
              onPress={() => deleteAccountHandler()}
              style={styles.submitBtns}>
              <Text style={styles.submitBtnText}>Delete Account</Text>
            </Button>
          </View>
        )
        break
      default:
        display = (
          <View>
            <Text style={styles.text}>Error</Text>
          </View>
        )
    }
    return (
      <View>
        <Button 
          style={styles.backBtn}
          onPress={() => updateSetting(null)}>
          <Text style={styles.backBtnText}>Back to Settings List</Text>
        </Button>
        {display}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  submitBtns: {
    width: wp('40%'),
    justifyContent: 'center',
    backgroundColor: '#fcf1d2',
    borderColor: '#620014',
    borderWidth: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25
  },
  submitBtnText: {
    color: '#620014',
    fontWeight: 'bold',
    fontSize: hp('1.6%')
  },
  backBtn: {
    backgroundColor: '#fcf1d2',
    borderColor: '#620014',
    borderWidth: 3,
    justifyContent: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('5%'),
    width: wp('80%'),
    alignSelf: 'center'
  },
  backBtnText: {
    fontSize: hp('1.6%'),
    fontWeight: 'bold',
    color: '#620014'
  },
  form: {
    alignSelf: 'center',
    width: wp('80%')
  },
  text: {
    fontSize: hp('1.6%')
  }
})