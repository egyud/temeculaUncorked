import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Text, Thumbnail, Button, Icon, Left, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings' 

const WineCard = ({ wine, isAuthenticated, user }) => {
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
                imageSize={25}
                readonly={!isAuthenticated}
                onFinishRating={(rate) => {
                  updateWineRating(rate)
                  // postRating()
                }}/>
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

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user.user,
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(WineCard)