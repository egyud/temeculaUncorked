import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Event from './Event'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default EventList = ({ events, navigation }) => {

  if (events && events.length > 0) {
    return (
      <View testID="event-list">
        {events.map(event => (
          <Event 
            key={event._id} 
            event={event}
            navigation={navigation} />
        ))}
      </View>
    )
  } else {
    return (
      <View testID="no-events-msg">
        <Text style={styles.text}>No events to display</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: hp('1.6%')
  }
})
