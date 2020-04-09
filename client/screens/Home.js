import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWineryList } from '../actions/wineActions' 
import { fetchAllReviews } from '../actions/reviewActions'
import { getUserEvents } from '../actions/authActions'
import { StyleSheet, View, Text, ImageBackground, TextInput } from 'react-native'
import { Header, Input, Icon, Item } from 'native-base'
import HomePageLink from '../components/HomePageLink/HomePageLink'
import ActivityFeed from '../components/ActivityFeed'


const Home = ({ navigation, getUserEvents, fetchWineries, fetchAllReviews, isAuthenticated, user }) => {

  useEffect(() => {
    console.log('HOME PAGE LOADED')
    fetchWineries()
    fetchAllReviews()
  }, [])

  useEffect(() => {
    getUserEvents(user)
  }, [isAuthenticated]) 
  
  function navigate(page) {
    navigation.navigate(page)
  }

  let login = (
    <>
      <HomePageLink
        iconName="sign-in"
        typeName="FontAwesome"          
        linkText='Login'
        nav={() => navigate('Login')}
      /> 
      <HomePageLink
        iconName="user-plus"
        typeName="FontAwesome"
        linkText='Register'
        nav={() => navigate('Register')}
      />
    </>
  )
  if(isAuthenticated) {
    login = (
      <HomePageLink 
        iconName="user-circle"
        typeName="FontAwesome"
        linkText='Account'
        nav={() => navigate('Account')}
      />
    )
  }

  return (
    <View style={styles.home}>
      <View>
        <ImageBackground 
          source={require('../assets/wineGlasses.jpg')}
          style={styles.imageBackground}>
          <View style={styles.linkContainer}>
            <HomePageLink
              iconName="list"
              typeName="FontAwesome"
              linkText='Wineries'
              nav={() => navigate('WineryList')}
            />
            <HomePageLink
              iconName="users"
              typeName="FontAwesome"
              linkText='Wine Clubs'
              nav={() => navigate('ClubList')}
            />
            <HomePageLink
              iconName="event"
              typeName="MaterialIcons"
              linkText='Events'
              nav={() => navigate('Events')}
            />
            <HomePageLink
              iconName="glass-wine"
              typeName="MaterialCommunityIcons"
              linkText='Wines'
              nav={() => navigate('WineSearch')}
            />
            {login}   
          </View>
        </ImageBackground>
      </View>
      <View>
        <View style={styles.lastestActivity}>
          <Text>Latest Activity</Text>
        </View>
        <ActivityFeed navigation={navigation}/>
      </View>
      
    </View>
  )
}

Home.navigationOptions = {
  title: 'Uncorked',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  linkContainer: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastestActivity: {
    borderBottomWidth: 1,
    backgroundColor: '#99ff99',
    textAlign: 'center',
    width: '100%',
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 10
  },
  imageBackground: {
    width: '100%', 
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  }
  
})

const mapStateToProps = (state) => {
  return {
    wineryList: state.wineReducer.wineriesList,
    isAuthenticated: state.authReducer.isAuthenticated,
    userEvents: state.authReducer.userEvents,
    user: state.authReducer.user.user,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchWineries: fetchWineryList,
  fetchAllReviews,
  getUserEvents
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)