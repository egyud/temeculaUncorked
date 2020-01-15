import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { Tabs, Tab, List, ListItem, Right } from 'native-base'
import { Rating } from 'react-native-ratings' 
import EventList from '../../components/EventList'
import BlockHeader from '../../components/BlockHeader'

export default WineryPage = () => {
  return (
    <View>
      <View>
        <ImageBackground 
          source={require('../../assets/wineGlasses.jpg')}
          style={styles.imageBackground}>
          {/* <View style={styles.headerBox}>
            <Text>Akash Winery</Text>
            <Rating />
            <Text>Call: 951-888-1393</Text>
            <Text>39730 Calle Contento, Temecula, CA 92591</Text>
          </View> */}
          <BlockHeader />
        </ImageBackground>
      </View>
      <Tabs style={styles.tabs}>
        <Tab heading="Wine List">

        </Tab>
        <Tab heading="Wine Clubs">

        </Tab>
        <Tab heading="Events">
          <EventList/>
        </Tab>
        <Tab heading="Hours">
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