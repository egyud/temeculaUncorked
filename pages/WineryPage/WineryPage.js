import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { Tabs, Tab, List, ListItem, Right } from 'native-base'
import { Rating } from 'react-native-ratings' 
import EventList from '../../components/EventList'
import WineClubInfo from '../../components/WineClubInfo'
import BlockHeader from '../../components/BlockHeader'

export default WineryPage = () => {
  return (
    <View>
      <View>
        <ImageBackground 
          source={require('../../assets/wineGlasses.jpg')}
          style={styles.imageBackground}>
          <BlockHeader />
        </ImageBackground>
      </View>
      <Tabs 
        style={styles.tabs}
        tabBarUnderlineStyle={{backgroundColor: '#89012c'}}>
        <Tab 
          heading="Wine List" 
          activeTextStyle={{color: '#89012c'}}
        >

        </Tab>
        <Tab 
          heading="Wine Clubs" 
          activeTextStyle={{color: '#89012c'}}
        >
          <WineClubInfo />
        </Tab>
        <Tab 
          heading="Events" 
          activeTextStyle={{color: '#89012c'}}
        >
          <EventList/>
        </Tab>
        <Tab 
          heading="Hours" 
          activeTextStyle={{color: '#89012c'}}
        >
          <List>
            <ListItem>
              <Text>Monday: 11am-6pm</Text>
            </ListItem>
            <ListItem>
              <Text>Tuesday: 11am-6pm</Text>
            </ListItem>
            <ListItem>
              <Text>Wednesday: 11am-6pm</Text>
            </ListItem>
            <ListItem>
              <Text>Thursday: 11am-6pm</Text>
            </ListItem>
            <ListItem>
              <Text>Friday: 11am-8pm</Text>
            </ListItem>
            <ListItem>
              <Text>Saturday: 11am-8pm</Text>
            </ListItem>
            <ListItem>
              <Text>Sunday: 11am-6pm</Text>
            </ListItem>
          </List>
        </Tab>
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: 'white',
    width: '80%',
    alignItems: 'center',
    paddingVertical: 50
  },
  imageBackground: {
    width: '100%', 
    paddingVertical: 40,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabs: {
    backgroundColor: '#99ff99'
  }
})