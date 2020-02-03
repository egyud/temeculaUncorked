import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Text, Button, Left, Right, Body } from 'native-base'

export default Event = ({ event, navigation }) => {
  // event will have props: winery, date, time, title, attending, price, whoCanAttend
  return (
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
          <Button 
            style={styles.moreButton}
            onPress={() => navigation.navigate('Event', { event: event })}>
            <Text>More</Text>
          </Button>
          <Text>{event.attending.length} going</Text>
        </Left>
        <Right>
          <Text>{event.time}</Text>
          <Text>{event.whoCanAttend}</Text>
          <Text>{event.price}</Text>
        </Right>
      </CardItem>
    </Card>
    
  )
}

const styles = StyleSheet.create({
  event: {
    backgroundColor: '#99ff99'
  },
  moreButton: {
    backgroundColor: '#89012c'
  }
})