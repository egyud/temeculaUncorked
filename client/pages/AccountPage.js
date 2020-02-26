import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Tabs, Tab, Form, Input, Label, Item } from 'native-base'
import EventList from '../components/EventList'
import MembershipList from '../components/MembershipList'
import FollowingList from '../components/FollowingList'

const AccountPage = ({ user, isAuthenticated, userEvents, wineryList, navigation }) => {
  const [selectedImage, updateSelectedImage] = useState({})
  const [newEmail, updateNewEmail] = useState('')
  const [newPassword, updateNewPassword] = useState('')
  const [newLink, updateNewLink] = useState('')
  const [newBio, updateNewBio] = useState('')

  const { events: eventsList } = userEvents
  const { memberOf, following } = user
  
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

  return (
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text style={styles.headerText}>{user.name}'s account</Text>
            </Body>
          </CardItem>
        </Card>
        <Tabs
          tabBarUnderlineStyle={{backgroundColor: '#89012c'}}>
          <Tab
            heading="Memberships"
            activeTextStyle={{color: '#89012c'}}>
          <MembershipList
            memberships={memberOf}
            wineryList={wineryList}/>
          </Tab>
          <Tab
          heading="Events"
          activeTextStyle={{color: '#89012c'}}>
          <View>
            <EventList 
              events={eventsList}
              navigation={navigation}
            />
          </View>
          </Tab>
         
          <Tab
            heading="Following"
            activeTextStyle={{color: '#89012c'}}>
            <FollowingList users={following}/>
          </Tab>
          <Tab
            heading="Settings"
            activeTextStyle={{color: '#89012c'}}>
            <Form>
              <Item stackedLabel>
                <Label>Update Email</Label>
                <Input
                  un 
                  autoCapitalize="none"
                  onChangeText={(text) => updateNewEmail(text)}
                  value={newEmail}
                />
              </Item>
              <Button
                style={styles.submitBtns}
                primary
                onPress={() => updateEmailSubmitHandler()}
              >
                <Text style={styles.submitBtnText}>Submit</Text>
              </Button>
            </Form>

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
                onPress={() => updatePasswordSubmitHandler()}
              >
                <Text style={styles.submitBtnText}>Submit</Text>
              </Button>
            </Form>

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
                onPress={() => updateLinkSubmitHandler()}
              >
                <Text style={styles.submitBtnText}>Submit</Text>
              </Button>
            </Form>

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
                onPress={() => updateBioSubmitHandler()}
              >
                <Text style={styles.submitBtnText}>Submit</Text>
              </Button>
            </Form>
          </Tab>
        </Tabs>
        
      </Content>
  )
}

AccountPage.navigationOptions = {
  title: 'Your Account',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  headerText: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
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

const mapStateToProps = state => {
  return {
    user: state.authReducer.user.user,
    isAuthenticated: state.authReducer.isAuthenticated,
    userEvents: state.authReducer.userEvents,
    wineryList: state.wineReducer.wineriesList
  }
}

export default connect(mapStateToProps)(AccountPage)