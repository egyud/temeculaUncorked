import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { connect } from 'react-redux'
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Spinner } from 'native-base'
import { Linking } from 'expo'
import { showMessage } from 'react-native-flash-message'
import ReviewList from '../components/ReviewList/ReviewList'
import RatingsList from '../components/RatingsList'


export const ProfileScreen = ({ activeUser, navigation, isAuthenticated }) => {
  const [currentUser, updateCurrentUser] = useState({})
  const [userReviews, updateUserReviews] = useState([])
  const [userRatings, updateUserRatings] = useState([])
  const [isLoading, updateIsLoading] = useState(true)

  const userId = navigation.getParam('userId')

  useEffect(() => {
    getUserInfo()
    getUserReviews()
    getUserRatings()
  }, [])

  useEffect(() => {
    updateIsLoading(false)
  }, [currentUser])

  

  function openInBrowser(url) {
    Linking.openURL(url)
  }

  function getUserInfo() {
    axios.get(`http://localhost:5000/api/users/${userId}`)
      .then(res => {
        // console.log(res.data.user)
        updateCurrentUser(res.data.user)
      })
      .catch(err => console.error(err))
  }

  function getUserReviews() {
    axios.get(`http://localhost:5000/api/reviews/${userId}`)
      .then(res => {
        updateUserReviews(res.data.reviews)
      })
      .catch(err => console.error(err))
  }

  function getUserRatings() {
    axios.get(`http://localhost:5000/api/ratings/${userId}`)
      .then(res => {
        console.log('wine ratings here *********')
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
  }

  if (isLoading) {
    return (
      <View>
        <Spinner testID="spinner"/>
      </View>
    )
  }

  const followButton = (
    <Button
      testID="follow-btn" 
      onPress={() => followUser()}>
      <Text>Follow</Text>
    </Button>
  )

  console.log('currentUser')
  console.log(currentUser)

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Card style={styles.headerCard}>
          <CardItem>
            <Left>
              <Body>
                <Text>{currentUser.name}</Text>
                <Text note>Joined: {moment(currentUser.date).format('LL')}</Text>
                <Text 
                  note
                  onPress={() => openInBrowser(currentUser.link)}>Website: {currentUser.link}</Text>
              </Body>
            </Left>
            <Right>
              <Thumbnail source={{ uri: currentUser.avatar.url }}/>
            </Right>
          </CardItem>
          <CardItem>
            <Left>
              {/* <Text>Member at {currentUser.memberOf.length} wineries</Text> */}
              <Text>"{currentUser.bio}"</Text>
            </Left>
            <Right>
              {isAuthenticated ? followButton : null}
            </Right>
          </CardItem>
        </Card>
      </View>
      <ScrollView>
        <View style={{ paddingBottom: 40 }}>
          <View style={styles.reviewsHeader}>
            <Text>Winery Review History</Text>
          </View>
          <ReviewList
            navigation={navigation} 
            reviews={userReviews}
            isProfileScreen={true}/>
          <View style={styles.reviewsHeader}>
            <Text>Wine Rating History</Text>
          </View>
          <RatingsList ratings={userRatings}/>
        </View>
      </ScrollView>
      
    </View>
  )
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  headerCard: {
    // flex: 1,
    width: '100%',
    height: 200
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
    activeUser: state.authReducer.user.user,
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(ProfileScreen)