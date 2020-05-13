import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Text, Thumbnail, Button, Icon, Left, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings' 
import { showMessage } from 'react-native-flash-message'
import postRating from '../utils/postRating'
import calculateAverage from '../utils/average'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default WineCard = ({ wine, isAuthenticated, user, navigation }) => {
  const [wineRating, updateWineRating] = useState(0)
  const { name, avgRating, winery, ratingCount, price, _id: wineId } = wine

  useEffect(() => {
    if (isAuthenticated && wineRating > 0) {
      postRating(user._id, wineId, wineRating)
        .then(res => {
          showMessage({
            message: res.data.message,
            type: 'success'
          })
        })
        .catch(err => {
          showMessage({
            message: err.response.data.message,
            type: 'danger'
          })
        })
    }
  }, [wineRating])

  return (
    <Card testID="wine-card" style={styles.card}>
      <CardItem>
        <Left>
          <Body>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text} note>{winery}</Text>
          </Body>
        </Left>
          <Right>
            <Body>
              <Rating
                startingValue={calculateAverage(avgRating, ratingCount)}
                imageSize={25}
                readonly={true}
                // onFinishRating={(rate) => updateWineRating(rate)}
                type="custom"
                ratingColor='#fcf1d2'
                style={{ paddingRight: 0, marginRight: 0 }}
             />
              <Text style={styles.text} note>{ratingCount} ratings</Text>
            </Body>
          </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Button
            testID="more-button"
            style={styles.moreBtn} 
            onPress={() => navigation.navigate('Wine', { wine })}>
            <Text style={styles.text}>More</Text>
          </Button>
        </Left>
        <Right>
          <Body>
            <Text style={styles.text}>{price}</Text>
          </Body>
        </Right>
      </CardItem>
    </Card>
  )
}

const styles = StyleSheet.create({
  moreBtn: {
    backgroundColor: '#620014'
  },
  card: {
    // backgroundColor: '#f5f5f5',
    width: '100%',
    paddingHorizontal: wp('7%')
  },
  text: {
    fontSize: hp('1.6%')
  }
})