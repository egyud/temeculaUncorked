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

  const { events: eventsList } = userEvents
  const { memberOf, following } = user
  
  console.log('memberOf')
  console.log(memberOf)

  const updateEmailSubmitHandler = () => {
    axios.post('http://localhost:5000/api/users/update-email', {
      newEmail,
      userId: user._id
    })
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  const updatePasswordSubmitHandler = () => {
    axios.post('http://localhost:5000/api/users/update-password', {
      newPassword,
      userId: user._id
    })
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  return (
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text>User name</Text>
            </Body>
          </CardItem>
        </Card>
        <Tabs
          tabBarUnderlineStyle={{backgroundColor: '#89012c'}}>
          <Tab
            heading="Update Account"
            activeTextStyle={{color: '#89012c'}}>
            <Form>
              <Item stackedLabel>
                <Label>Update Email</Label>
                <Input 
                  autoCapitalize="none"
                  onChangeText={(text) => updateNewEmail(text)}
                />
                <Button
                  primary
                  onPress={() => updateEmailSubmitHandler()}
                >
                  <Text>Submit</Text>
                </Button>
              </Item>
            </Form>

            <Form>
              <Item stackedLabel>
                <Label>Update Password</Label>
                <Input 
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChangeText={(text) => updateNewPassword(text)}
                />
                <Button
                  primary
                  onPress={() => updatePasswordSubmitHandler()}
                >
                  <Text>Submit</Text>
                </Button>
              </Item>
            </Form>
          </Tab>
          <Tab
            heading="Memberships"
            activeTextStyle={{color: '#89012c'}}>
            <MembershipList
              memberships={memberOf}
              wineryList={wineryList}/>
          </Tab>
          <Tab
            heading="Following"
            activeTextStyle={{color: '#89012c'}}>
            <FollowingList users={following}/>
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
        </Tabs>
        
      </Content>
  )
}

const styles = StyleSheet.create({

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