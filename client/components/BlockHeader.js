import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Text, Thumbnail, Button, Icon, Left, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings'

export default BlockHeader = () => {
  return (
    <Card style={styles.block}>
      <CardItem>
        <Left>
          <Body>
            <Text>Wiens Family Cellars</Text>
          </Body>
        </Left>
        <Right>
          <Rating imageSize={25} />
          <Text>75 Reviews</Text>
        </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Button style={styles.photoButton}>
            <Text style={styles.photoButtonText}>Photos</Text>
          </Button>
        </Left>
        <Right>
          <Button style={styles.callButton}>
            <Text style={styles.callText}>951-888-1393</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  )
}

const styles = StyleSheet.create({
  block: {
    width: '80%',
    marginVertical: 0,
    marginHorizontal: 'auto'
  },
  callButton: {
    backgroundColor: 'white',
  },
  callText: {
    color: '#89012c'
  },
  photoButton: {
    backgroundColor: '#99ff99',
    // backgroundColor: '#89012c'
  },
  photoButtonText: {
    color: '#89012c'
  }
})