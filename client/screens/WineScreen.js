import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { View, StyleSheet, Image } from 'react-native'
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, List, ListItem, Spinner } from 'native-base'
import { Rating } from 'react-native-ratings'
import { showMessage } from 'react-native-flash-message'
import UserRating from '../components/UserRating'
import getUserWineRating from '../utils/getUserWineRating'
import getRecentRatings from '../utils/getRecentRatings'
import postRating from '../utils/postRating'

export const WineScreen = ({ navigation, user, isAuthenticated }) => {
  const [wineRating, updateWineRating] = useState(0)
  const [recentRatings, updateRecentRatings] = useState([])
  const [userRating, updateUserRating] = useState(0)
  const [isLoading, updateIsLoading] = useState(true)
  const wine = navigation.getParam('wine')
  const { name, rating, winery, ratingCount, price, clubPrice, _id: wineId, description } = wine

  useEffect(() => {
    getRecentRatings(wineId)
      .then(res => updateRecentRatings(res.data.ratings))
      .catch(err => console.error(err))
    getUserRating()
  }, [])

  useEffect(() => {
    if (isAuthenticated && wineRating > 0) {
      postRating()
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

  function getUserRating() {
    if (isAuthenticated) {
      getUserWineRating(wineId, user._id)
        .then(res => updateUserRating(res.data.rating))
        .then(res => updateIsLoading(false))
        .catch(err => console.error(err))
    }
    updateIsLoading(false)
  }

 const uRate = (
    <>
      <Text>Your Rating</Text>
      <UserRating
        testID="user-rating"
        disabled={false}
        size={25} 
        value={userRating}
        rateFunc={(rate) => updateWineRating(rate)}/>
    </>
  )
  
  if (isLoading === true) {
    return (
      <Spinner testID="spinner"/>
    )
  }
  return (
    <Content>
      <View>
        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text style={styles.title}>{name}</Text>
                <Text note>{winery}</Text>
              </Body>
            </Left>
            <Right>
              <Body>
                <Text>{price}</Text>
                <Text>Members price {clubPrice}</Text>
              </Body>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Image 
                source={require('../assets/wineGlasses.jpg')}
                style={styles.image}/>
            </Body>
          </CardItem>
          <CardItem>
            <Left style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              {/* <Body style={{ marginLeft: 0 }}> */}
                <Text style={{ alignSelf: 'flex-start' }}>Avg. Rating</Text>
                <Rating
                  style={{ marginLeft: 0, paddingLeft: 0 }}
                  imageSize={isAuthenticated ? 25 : 40} 
                  startingValue={rating}
                  readonly={true}
                  type="custom"
                  ratingColor='#fcf1d2' />
              {/* </Body> */}
            </Left>
            <Right>
              {isAuthenticated ? uRate : null}
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Next level aesthetic tbh, polaroid beard 8-bit YOLO. Artisan tumblr copper mug craft beer hashtag everyday carry iPhone you probably haven't heard of them vegan normcore ugh. Umami roof party williamsburg trust fund stumptown yr, godard swag.</Text>
            </Body>
          </CardItem>
        </Card>
        <Text>Recent Ratings</Text>
        <List 
          testID="recent-ratings"
          style={{ backgroundColor: '#fff' }}>
          {recentRatings.map(rate => (
            <ListItem
              testID="rating-item"
              key={rate.userId._id} 
              style={{ backgroundColor: '#fff' }}
              onPress={() => navigation.navigate('Profile', { userId: rate.userId._id })}>
              <Left>
                <Thumbnail source={{ uri: rate.userId.avatar.url }}/>
                <Text>{rate.userId.name}</Text>
              </Left>
              <Body>
                <Rating
                  readonly={true}
                  startingValue={rate.rating}
                  imageSize={25}
                  type="custom"
                  ratingColor='#fcf1d2' />
              </Body>
              <Right>
              </Right>
            </ListItem>
          ))}
        </List>
      </View>
    </Content>
  )
}

WineScreen.navigationOptions = {
  title: 'Wine',
  headerStyle: {
    backgroundColor: '#fcf1d2'
  }
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: '100%',
    // flex: 1
  },
  title: {
    fontSize: 25
  },
})

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user.user,
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(WineScreen)