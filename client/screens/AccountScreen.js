import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Tabs, Tab, Form, Input, Label, Item } from 'native-base'
import EventList from '../components/EventList'
import FollowingWineryList from '../components/FollowingWineryList'
import FollowingList from '../components/FollowingList'
import Settings from '../components/Settings'

export const AccountScreen = ({ user, isAuthenticated, userEvents, wineryList, navigation }) => {

  const { events: eventsList } = userEvents
  const { memberOf, following } = user
  
  return (
      <Content>
        <Tabs
          tabBarUnderlineStyle={{backgroundColor: '#89012c'}}>
          <Tab
            testID="account-tab"
            heading="Settings"
            activeTextStyle={{color: '#89012c'}}>
            <Settings user={user}/>
          </Tab>
          <Tab
            testID="account-tab"
            heading="My Events"
            activeTextStyle={{color: '#89012c'}}>
            <View>
              <EventList 
                events={eventsList}
                navigation={navigation}
              />
            </View>
          </Tab>
          <Tab
            testID="account-tab"
            heading="Wineries Followed"
            activeTextStyle={{color: '#89012c'}}>
            <FollowingWineryList
              navigation={navigation}
              wineries={memberOf}
              wineryList={wineryList}/>
          </Tab>
          <Tab
            testID="account-tab"
            heading="Users Followed"
            activeTextStyle={{color: '#89012c'}}>
            <FollowingList
              navigation={navigation} 
              users={following}/>
          </Tab>
          
        </Tabs>
        
      </Content>
  )
}

AccountScreen.navigationOptions = {
  title: 'Your Account',
  headerStyle: {
    backgroundColor: '#fcf1d2'
  }
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

export default connect(mapStateToProps)(AccountScreen)