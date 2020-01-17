import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base'
import events from '../fakeData/events'

export default EventPage = () => {
  const event = events[0]
  const { title, winery, date, time, price, going, whoCanAttend, description, address } = event
  return (
    <View>
      <Card>
        <CardItem>
          <Left>
            <Body>
              <Text style={styles.title}>{title}</Text>
              <Text note>{date}</Text>
              <Text note>{winery}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Image 
              source={require('../assets/events.jpg')}
              style={styles.image}/>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button 
              style={styles.attendButton}
            >
              <Text>Attend</Text>
            </Button>
            <Text>{going} going</Text>
          </Left>
          <Right>
            <Button>
              <Text>Photos</Text>
            </Button>
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Text note>{address}</Text>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{description}</Text>
          </Body>
        </CardItem>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: '100%',
    flex: 1
  },
  title: {
    fontSize: 25
  },
  location: {
    fontSize: 14
  }
})