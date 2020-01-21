import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem, Right, Body } from 'native-base'
import Event from './Event'
// import events from '../fakeData/events'

export default EventList = ({ events }) => {
  return (
    <View>
      {events.map(event => (
        <Event key={event._id} event={event}/>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({

})
