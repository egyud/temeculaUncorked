import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem, Right, Body } from 'native-base'
import Event from './Event'
import events from '../events'

export default EventList = () => {
  return (
    <View>
      {events.map(event => (
        <Event event={event}/>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({

})
