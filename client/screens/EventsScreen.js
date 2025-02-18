import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import EventList from '../components/EventList'
import getEvents from '../utils/getEvents'

export default EventsScreen = ({ navigation }) => {
  const [events, updateEvents] = useState([])

  useEffect(() => {
    getEvents()
      .then(res => updateEvents(res.data.events))
      .catch(err => console.error(err))
  }, [])

  return (
    <ScrollView>
      <View>
        <EventList 
          events={events}
          navigation={navigation}/>
      </View>
    </ScrollView>
  )
}

EventsScreen.navigationOptions = {
  title: 'Events',
  headerStyle: {
    backgroundColor: '#fcf1d2'
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
    backgroundColor: '#620014',
    paddingVertical: 25,
    paddingHorizontal: 40
  }
})