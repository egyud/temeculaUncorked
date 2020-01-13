import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Header, Input, Icon, Item } from 'native-base'
import HomePageLink from '../../components/HomePageLink/HomePageLink'
import ReviewList from '../../components/ReviewList/ReviewList'

export default Home = () => {
  return (
    <View>
      <View>
        {/* picture header part */}
        <Header searchBar rounded style={styles.search}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search for wineries" />
          </Item>
          
        </Header>
        <View style={styles.linkContainer}>
          <HomePageLink linkText='Winery Directory'/>
          <HomePageLink linkText='Wine Clubs'/>
          <HomePageLink linkText='Events'/>
          <HomePageLink linkText='Wines'/>          
        </View>
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
  search: {
    paddingBottom: 20
  },
  linkContainer: {
    flexDirection: 'row'
  },
  lastestActivity: {
    borderBottomColor: 1,
    textAlign: 'center',
    width: '100%'
  }
  
})