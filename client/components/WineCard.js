import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Text, Thumbnail, Button, Icon, Left, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings' 

export default WineCard = ({ wine }) => {
  const { name, rating, winery, ratingCount, price } = wine
  

  return (
    <Card>
      <CardItem>
        <Left>
          <Body>
            <Text>{name}</Text>
            <Text note>{winery}</Text>
          </Body>
        </Left>
          <Right>
            <Body>
              <Rating 
                startingValue={rating}
                imageSize={25}/>
              <Text note>{ratingCount} ratings</Text>
            </Body>
          </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Body>
            <Text>{price}</Text>
            <Text>{rating}</Text>
          </Body>
        </Left>
        <Right></Right>
      </CardItem>
    </Card>
  )
}

const styles = StyleSheet.create({

})