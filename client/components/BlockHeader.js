import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Text, Thumbnail, Button, Icon, Left, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings'
import UserRating from '../components/UserRating'

export default BlockHeader = ({ data, rating, choosePhoto, submitPhoto, userRating, isAuthenticated }) => {
  const { name, phone, reviewCount } = data

  let uRate = (
    <>
      <UserRating
        disabled={true} 
        size={25}
        value={userRating}
      />
      <Text>Your rating</Text>
    </>
  )
  return (
    <Card style={styles.block}>
      <CardItem >
        <Left>
          <Body>
            <Text style={styles.wineryName}>{name}</Text>
          </Body>
        </Left>
        <Right>
          <Rating
            readonly={true}
            imageSize={25} 
            startingValue={rating}
            type="custom"
            ratingColor="#99ff99" />
          <Text>{reviewCount} Reviews</Text>
          {isAuthenticated ? uRate : null}
        </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Button style={styles.callButton}>
            <Text style={styles.callText}>{phone}</Text>
          </Button>
        </Left>
      </CardItem>
    </Card>
  )
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff'
  },
  wineryName: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  callButton: {
    backgroundColor: '#f1f1d4'
  },
  callText: {
    color: '#89012c',
    fontWeight: '700',
    fontSize: 20
  },
  photoButton: {
    backgroundColor: '#99ff99',
    marginRight: 4
    // backgroundColor: '#89012c'
  },
  photoButtonText: {
    color: '#89012c'
  },
  icon: {
    color: '#614D36'
  }
})