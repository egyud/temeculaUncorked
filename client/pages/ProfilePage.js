import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { connect } from 'react-redux'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import ReviewList from '../components/ReviewList/ReviewList'


const ProfilePage = ({ activeUser, navigation }) => {
  const [currentUser, updateCurrentUser] = useState({})
  const [userReviews, updateUserReviews] = useState([])
  const [userRatings, updateUserRatings] = useState([])

  const userId = navigation.getParam('userId')

  useEffect(() => {
    getUserInfo()
    getUserReviews()
  }, [])

  function getUserInfo() {
    axios.get(`http://localhost:5000/api/users/${userId}`)
      .then(res => {
        console.log(res.data.user)
        updateCurrentUser(res.data.user)
      })
      .catch(err => console.error(err))
  }

  function getUserReviews() {
    axios.get(`http://localhost:5000/api/reviews/${userId}`)
      .then(res => {
        console.log(res.data.reviews)
        updateUserReviews(res.data.reviews)
      })
      .catch(err => console.error(err))
  }

  function getUserRatings(id) {
    axios.get(`http://localhost:5000/api/ratings/${id}`)
      .then(res => {
        console.log(res.data.ratings)
        updateUserRatings(res.data.ratings)
      })
      .catch(err => console.error(err))
  }

  function followUser() {
    if (activeUser) {
      axios.post(`http://localhost:5000/api/users/follow`, {
        userIdToFollow: userId,
        activeUser
      })
        .then(res => console.log(res.data))
        .catch(err => console.error(err))
    }
  }

  if (!currentUser.avatar) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  console.log('currentUser')
  console.log(currentUser)

  return (
    <View>
      <View>
        <ImageBackground
          source={require('../assets/wineGlasses.jpg')}
          style={styles.imageBackground}
        >
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: currentUser.avatar.url }}/>
              </Left>
              <Body>
                <Text>{currentUser.name}</Text>
                <Text note>Joined: {moment(currentUser.date).format('LL')}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Member at {currentUser.memberOf.length} wineries</Text>
              </Left>
              <Right>
                <Button onPress={() => followUser()}>
                  <Text>Follow</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </ImageBackground>
      </View>
      <View>
        <View style={styles.reviewsHeader}>
          <Text>Winery Review History</Text>
        </View>
        <ReviewList reviews={userReviews}/>
        <View style={styles.reviewsHeader}>
          <Text>Wine Rating History</Text>
        </View>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%', 
    // paddingVertical: 40,
    height: 250,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  reviewsHeader: {
    borderBottomWidth: 1,
    backgroundColor: '#99ff99',
    textAlign: 'center',
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10
  }
})

const mapStateToProps = (state) => {
  return {
    activeUser: state.authReducer.user.user
  }
}

export default connect(mapStateToProps)(ProfilePage)