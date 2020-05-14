import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Image } from 'react-native'
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, List, ListItem, Spinner } from 'native-base'
import { Rating } from 'react-native-ratings'
import { showMessage } from 'react-native-flash-message'
import UserRating from '../components/UserRating'
import getUserWineRating from '../utils/getUserWineRating'
import getRecentRatings from '../utils/getRecentRatings'
import postRating from '../utils/postRating'
import calculateAverage from '../utils/average'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export const WineScreen = ({ navigation, user, isAuthenticated }) => {
  const [wineRating, updateWineRating] = useState(0)
  const [recentRatings, updateRecentRatings] = useState([])
  const [userRating, updateUserRating] = useState(0)
  const [isLoading, updateIsLoading] = useState(true)
  const wine = navigation.getParam('wine')
  const { name, avgRating, winery, ratingCount, price, clubPrice, _id: wineId, description } = wine

  useEffect(() => {
    getRecentRatings(wineId)
      .then(res => updateRecentRatings(res.data.ratings))
      .catch(err => console.error(err))
    getUserRating()
  }, [])

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

  function getUserRating() {
    if (isAuthenticated) {
      getUserWineRating(wineId, user._id)
        .then(res => {
          // if (res.data.rating) 
          updateUserRating(res.data.rating)
        })
        .then(res => updateIsLoading(false))
        .catch(err => console.error(err))
    }
    updateIsLoading(false)
  }

 const uRate = (
    <>
      <Text style={styles.text}>Your Rating</Text>
      <UserRating
        testID="user-rating"
        disabled={false}
        size={25} 
        value={userRating || 0}
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
          <CardItem style={styles.topCardItem}>
            <Left>
              <Body>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.text} note>{winery}</Text>
              </Body>
            </Left>
            <Right>
              <Body>
                <Text style={styles.text}>{price}</Text>
                <Text style={styles.text}>Members price {clubPrice}</Text>
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
          <CardItem style={styles.topCardItem}>
            <Left style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              {/* <Body style={{ marginLeft: 0 }}> */}
                <Text style={{ alignSelf: 'flex-start', fontSize: hp('1.6%') }}>Avg. Rating</Text>
                <Rating
                  style={{ marginLeft: 0, paddingLeft: 0 }}
                  imageSize={isAuthenticated ? 25 : 40} 
                  startingValue={calculateAverage(avgRating, ratingCount)}
                  readonly={true}
                  type="custom"
                  ratingColor='#fcf1d2' />
              {/* </Body> */}
            </Left>
            <Right>
              {isAuthenticated ? uRate : null}
            </Right>
          </CardItem>
          <CardItem style={styles.topCardItem}>
            <Body>
              <Text style={styles.text}>Next level aesthetic tbh, polaroid beard 8-bit YOLO. Artisan tumblr copper mug craft beer hashtag everyday carry iPhone you probably haven't heard of them vegan normcore ugh. Umami roof party williamsburg trust fund stumptown yr, godard swag.</Text>
            </Body>
          </CardItem>
        </Card>
        <Text style={styles.recentTitle}>Recent Ratings</Text>
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
                <Text style={styles.text}>{rate.userId.name}</Text>
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
  title: '',
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
    fontSize: hp('2.7%')
  },
  topCardItem: {
    marginVertical: hp('2%')
  },
  recentTitle: {
    marginVertical: hp('2%'),
    paddingLeft: wp('2%'),
    fontSize: hp('1.6%')
  },
  text: {
    fontSize: hp('1.6%')
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user.user,
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(WineScreen)