import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Tabs, Tab } from 'native-base'

import MembershipList from '../components/MembershipList'

const AccountPage = ({ user, isAuthenticated, userEvents, wineryList }) => {
  const [selectedImage, updateSelectedImage] = useState({})
  const [newEmail, updateNewEmail] = useState('')
  const [newPassword, updateNewPassword] = useState('')
  const [eventsList, updateEventsList] = useState([])

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

          </Tab>
          <Tab
            heading="Memberships"
            activeTextStyle={{color: '#89012c'}}>
            <MembershipList wineryList={wineryList}/>
          </Tab>
          <Tab
            heading="Following"
            activeTextStyle={{color: '#89012c'}}>

          </Tab>
          <Tab
            heading="Events"
            activeTextStyle={{color: '#89012c'}}>
            <View>
              {userEvents.map(event => (
                <Text>{event.title}</Text>
              ))}
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