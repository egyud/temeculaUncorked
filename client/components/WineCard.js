import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Text, Thumbnail, Button, Icon, Left, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings' 

export default WineCard = ({ wine, isAuthenticated, user, navigation }) => {
  const [wineRating, updateWineRating] = useState(0)
  const { name, rating, winery, ratingCount, price, _id: wineId } = wine

  useEffect(() => {
    postRating()
  }, [wineRating])

  function postRating() {
    if (isAuthenticated && wineRating > 0) {
      axios.post('http://localhost:5000/api/ratings', {
        userId: user._id,
        wineId,
        rating: wineRating 
      })
        .then(res => console.log(res.data))
        .catch(err => console.error(err))
    }
  }

  return (
    <Card testID="wine-card" style={styles.card}>
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
                imageSize={25}
                readonly={true}
                onFinishRating={(rate) => updateWineRating(rate)}
                type="custom"
                ratingColor="#99ff99" />
              <Text note>{ratingCount} ratings</Text>
            </Body>
          </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Button
            testID="more-button"
            style={styles.moreBtn} 
            onPress={() => navigation.navigate('Wine', { wine })}>
            <Text>More</Text>
          </Button>
        </Left>
        <Right>
          <Body>
            <Text>{price}</Text>
          </Body>
        </Right>
      </CardItem>
    </Card>
  )
}

const styles = StyleSheet.create({
  moreBtn: {
    backgroundColor: '#614D36'
  },
  card: {
    backgroundColor: '#f5f5f5'
  }
})