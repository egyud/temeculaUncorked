import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, Spinner } from 'native-base'
import { Linking } from 'expo'
import { showMessage } from 'react-native-flash-message'
import ReviewList from '../components/ReviewList'
import RatingsList from '../components/RatingsList'
import getUserInfo from '../utils/getUserInfo'
import getUserReviews from '../utils/getUserReviews'
import getUserRatings from '../utils/getUserRatings'
import followUser from '../utils/followUser'
import blockUser from '../utils/blockUser'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export const ProfileScreen = ({ activeUser, navigation, isAuthenticated }) => {
  const [currentUser, updateCurrentUser] = useState({})
  const [userReviews, updateUserReviews] = useState([])
  const [userRatings, updateUserRatings] = useState([])
  const [isLoading, updateIsLoading] = useState(true)

  const userId = navigation.getParam('userId')

  useEffect(() => {
    getUserInfo(userId)
      .then(res => updateCurrentUser(res.data.user))
      .catch(err => console.error(err))
    getUserReviews(userId)
      .then(res => updateUserReviews(res.data.reviews))
      .catch(err => console.error(err))
    getUserRatings(userId)
      .then(res => updateUserRatings(res.data.ratings))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    updateIsLoading(false)
  }, [currentUser])

  

  function openInBrowser(url) {
    Linking.openURL(url)
  }

  function followHandler() {
    if (activeUser) {
      followUser(userId, activeUser)
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

  function blockHandler() {
    if (activeUser) {
      blockUser(activeUser._id, userId)
        .then(res => {
          showMessage({
            message: res.data.message,
            type: 'success'
          })
          navigation.navigate('Home')
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


  let thumbnail = null
  if (currentUser.avatar) {
    thumbnail = <Thumbnail source={{ uri: currentUser.avatar.url }}/>
  }

  const followButton = (
    <Button
      style={styles.followBtn}
      testID="follow-btn" 
      onPress={() => followHandler()}>
      <Text style={styles.followBtnText}>Follow</Text>
    </Button>
  )

  const blockButton = (
    <Button
      style={styles.followBtn}
      testID="block-btn" 
      onPress={() => blockHandler()}>
      <Text style={styles.followBtnText}>Block</Text>
    </Button>
  )

  return (
    <View
      testID="profile-screen" 
      style={{ flex: 1 }}>
      <View>
        <Card style={styles.headerCard}>
          <CardItem>
            <Left>
              <Body>
                <Text style={styles.text}>{currentUser.name}</Text>
                <Text style={styles.text} note>Joined: {moment(currentUser.date).format('LL')}</Text>
                <Text
                  style={styles.text} 
                  note
                  onPress={() => openInBrowser(currentUser.link)}>Website: {currentUser.link}</Text>
              </Body>
            </Left>
            <Right>
              {thumbnail}
            </Right>
          </CardItem>
          <CardItem>
            <Left>
              <Text style={styles.text}>"{currentUser.bio}"</Text>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              {isAuthenticated ? blockButton : null}
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
            <Text style={styles.text}>Winery Review History</Text>
          </View>
          <ReviewList
            activeUser={activeUser}
            navigation={navigation} 
            reviews={userReviews}
            isProfileScreen={true}/>
          <View style={styles.reviewsHeader}>
            <Text style={styles.text}>Wine Rating History</Text>
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
    backgroundColor: '#fcf1d2'
  }
}

const styles = StyleSheet.create({
  headerCard: {
    width: '100%',
    height: 200
  },
  reviewsHeader: {
    borderBottomWidth: 1,
    backgroundColor: '#ede1c4',
    textAlign: 'center',
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10
  },
  text: {
    fontSize: hp('1.6%')
  },
  followBtn: {
    backgroundColor: '#fcf1d2',
    borderColor: '#620014',
    borderWidth: 3
  },
  followBtnText: {
    fontSize: hp('1.6%'),
    color: '#620014',
    fontWeight: 'bold'
  }
})

const mapStateToProps = (state) => {
  return {
    activeUser: state.authReducer.user.user,
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(ProfileScreen)