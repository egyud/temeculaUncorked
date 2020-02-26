import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Event from './Event'

export default EventList = ({ events, navigation }) => {
  return (
    <View>
      {events.map(event => (
        <Event 
          key={event._id} 
          event={event}
          navigation={navigation} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({

})
