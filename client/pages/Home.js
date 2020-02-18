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
        linkText='Login'          
        nav={() => navigate('Login')}
      /> 
      <HomePageLink
        linkText='Register'
        nav={() => navigate('Register')}
      />
    </>
  )
  if(isAuthenticated) {
    login = (
      <HomePageLink 
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
          {/* <TextInput 
            onFocus={() => navigate('WineryList')}
            style={styles.searchBar}
            placeholder='Search for wineries'/> */}
          <View style={styles.linkContainer}>
            <HomePageLink
              linkText='Winery Directory'
              nav={() => navigate('WineryList')}
            />
            <HomePageLink
              linkText='Wine Clubs'
              nav={() => navigate('ClubList')}
            />
            <HomePageLink
              linkText='Events'
              nav={() => navigate('Events')}
            />
            <HomePageLink
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
  // home: {
  //   backgroundColor: '#99ff99'
  // },
  searchBar: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 30,
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '80%',
  },
  linkContainer: {
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