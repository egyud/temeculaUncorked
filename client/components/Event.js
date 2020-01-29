import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, CardItem, Text, Thumbnail, Button, Icon, Left, Right, Body } from 'native-base'

export default Event = ({ event, navigation }) => {
  // event will have props: winery, date, time, title, attending, price, whoCanAttend
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Event', { event: event })}>
      <Card 
        style={styles.event}
      >
        <CardItem>
          <Left>
            <Body>
              <Text>{event.title}</Text>
              <Text note>{event.date}</Text>
            </Body>
          </Left>
          <Right>
            <Text>{event.winery}</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Button style={styles.attendButton}>
              <Text>Attend</Text>
            </Button>
            <Text>{event.going} going</Text>
          </Left>
          <Right>
            <Text>{event.time}</Text>
            <Text>{event.whoCanAttend}</Text>
            <Text>{event.price}</Text>
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
    
  )
}

const styles = StyleSheet.create({
  event: {
    backgroundColor: '#99ff99'
  },
  attendButton: {
    backgroundColor: '#89012c'
  }
})