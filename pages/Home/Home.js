import React from 'react'
import { StyleSheet, View, Text, ImageBackground, TextInput } from 'react-native'
import { Header, Input, Icon, Item } from 'native-base'
import HomePageLink from '../../components/HomePageLink/HomePageLink'
import ReviewList from '../../components/ReviewList/ReviewList'

export default Home = () => {
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
              path='wineryList' 
              linkText='Winery Directory'
            />
            <HomePageLink
              path='wineClubs' 
              linkText='Wine Clubs'
            />
            <HomePageLink
              path='eventsPage' 
              linkText='Events'
            />
            <HomePageLink
              path='wineList' 
              linkText='Wines'
            />          
          </View>
        </ImageBackground>
      </View>
      <View>
        <View style={styles.lastestActivity}>
          <Text>Latest Activity</Text>
        </View>
        <ReviewList />
      </View>
    </View>
  )
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