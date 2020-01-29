import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import EventList from '../../components/EventList'

export default EventsPage = ({ navigation }) => {
  const [events, updateEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  function getEvents() {
    axios.get('http://localhost:5000/api/events')
      .then(res => updateEvents(res.data.events))
      .catch(err => console.error(err))
  }

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
      <EventList 
        events={events}
        navigation={navigation}/>
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
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#89012c',
    paddingVertical: 25,
    paddingHorizontal: 40
  }
})