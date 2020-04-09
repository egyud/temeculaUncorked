import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Tabs, Tab, Form, Input, Label, Item } from 'native-base'
import EventList from '../components/EventList'
import FollowingWineryList from '../components/FollowingWineryList'
import FollowingList from '../components/FollowingList'
import Settings from '../components/Settings'

const AccountScreen = ({ user, isAuthenticated, userEvents, wineryList, navigation }) => {

  const { events: eventsList } = userEvents
  const { memberOf, following } = user
  
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
            heading="Wineries Followed"
            activeTextStyle={{color: '#89012c'}}>
          <FollowingWineryList
            navigation={navigation}
            wineries={memberOf}
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
            <FollowingList
              navigation={navigation} 
              users={following}/>
          </Tab>
          <Tab
            heading="Settings"
            activeTextStyle={{color: '#89012c'}}>
            <Settings />
          </Tab>
        </Tabs>
        
      </Content>
  )
}

AccountScreen.navigationOptions = {
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