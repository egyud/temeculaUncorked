import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Text, Thumbnail, Button, Icon, Left, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings'

export default BlockHeader = ({ data, rating }) => {
  const { name, phone, reviewCount } = data
  return (
    <Card style={styles.block}>
      <CardItem>
        <Left>
          <Body>
            <Text>{name}</Text>
          </Body>
        </Left>
        <Right>
          <Rating 
            imageSize={25} 
            startingValue={rating}/>
          <Text>{reviewCount} Reviews</Text>
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
            <Text style={styles.callText}>{phone}</Text>
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