import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Text, Button, Left, Right, Body } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import moment from 'moment'
import modifyTimestamp from '../utils/modifyTimestamp'

export default Event = ({ event, navigation }) => {
  // event will have props: winery, date, time, title, attending, price, whoCanAttend
  return (
    <Card 
      style={styles.event}
      testID="event-card"
    >
      <CardItem>
        <Left>
          <Body>
            <Text style={styles.text}>{event.title}</Text>
            <Text style={styles.text} note>{moment(modifyTimestamp(event.date)).format('MMMM Do YYYY')}</Text>
          </Body>
        </Left>
        <Right>
          <Text style={styles.text}>{event.winery}</Text>
        </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Button
            testID="more-btn" 
            style={styles.moreButton}
            onPress={() => navigation.navigate('Event', { event: event })}>
            <Text style={styles.text}>More</Text>
          </Button>
          <Text style={styles.text}>{event.attending.length} going</Text>
        </Left>
        <Right>
          <Text style={styles.text}>{event.time}</Text>
          <Text style={styles.text}>{event.whoCanAttend}</Text>
          <Text style={styles.text}>{event.price}</Text>
        </Right>
      </CardItem>
    </Card>
    
  )
}

const styles = StyleSheet.create({
  event: {
  },
  moreButton: {
    backgroundColor: '#620014'
  },
  text: {
    fontSize: hp('1.6%')
  }
})