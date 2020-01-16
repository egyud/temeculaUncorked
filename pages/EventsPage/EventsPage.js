import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import EventList from '../../components/EventList'

export default EventsPage = () => {
  return (
    <View>
      <View>
        <ImageBackground
          source={require('../../assets/wineGlasses.jpg')}
          style={styles.imageBackground}
        >
          <Text style={styles.headline}>Upcoming Events</Text>
        </ImageBackground>
      </View>
      <EventList />
    </View>
  )
}

EventsPage.navigationOptions = {
  title: 'Events',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%', 
    paddingVertical: 40,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headline: {
    fontSize: 30,
    color: '#89012c',
    backgroundColor: '#99ff99',
    paddingVertical: 5,
    paddingHorizontal: 10
  }
})