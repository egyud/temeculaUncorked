import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWineryList } from '../../actions/wineActions' 
import { fetchAllReviews } from '../../actions/reviewActions'
import { StyleSheet, View, Text, ImageBackground, TextInput } from 'react-native'
import { Header, Input, Icon, Item } from 'native-base'
import HomePageLink from '../../components/HomePageLink/HomePageLink'
import ActivityFeed from '../../components/ActivityFeed'

const Home = ({ navigation, fetchWineries, fetchAllReviews }) => {

  useEffect(() => {
    fetchWineries()
    fetchAllReviews()
  }, [])
  
  function navigate(page) {
    navigation.navigate(page)
  }

  return (
    <View>
      <View>
        <ImageBackground 
          source={require('../../assets/wineGlasses.jpg')}
          style={{width: '100%', height: 300}}>
          <TextInput 
            style={styles.searchBar}
            placeholder='Search for wineries'/>
          <View style={styles.linkContainer}>
            <HomePageLink
              linkText='Winery Directory'
              nav={() => navigate('WineryList')}
            />
            <HomePageLink
              linkText='Wine Clubs'
              nav={() => navigate('WineClubs')}
            />
            <HomePageLink
              linkText='Events'
              nav={() => navigate('Events')}
            />
            <HomePageLink
              linkText='Wines'
              nav={() => navigate('WineSearch')}
            />
            <HomePageLink
              linkText='Login'
              nav={() => navigate('Login')}
            /> 
            <HomePageLink
              linkText='Register'
              nav={() => navigate('Register')}
            />           
          </View>
        </ImageBackground>
      </View>
      <View>
        <View style={styles.lastestActivity}>
          <Text>Latest Activity</Text>
        </View>
        <ActivityFeed />
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
    paddingBottom: 30,
  },
  lastestActivity: {
    borderBottomWidth: 1,
    backgroundColor: '#99ff99',
    textAlign: 'center',
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10
  }
  
})

const mapStateToProps = (state) => {
  return {
    wineryList: state.wineReducer.wineriesList
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchWineries: fetchWineryList,
  fetchAllReviews
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)