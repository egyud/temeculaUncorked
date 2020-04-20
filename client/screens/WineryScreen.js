import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { Tabs, Tab, Text, Icon, Button, Content, Spinner } from 'native-base'
import EventList from '../components/EventList'
import BlockHeader from '../components/BlockHeader'
import WineryInfo from '../components/WineryInfo'
import ReviewList from '../components/ReviewList/ReviewList'
import ClubList from '../components/ClubList'
import WineryWineList from '../components/WineryWineList'
import calculateAverage from '../utils/average'
import getUserRating from '../utils/getUserRating'
import getWineryImages from '../utils/getWineryImages'
import getEventsData from '../utils/getEventsData'
import getWineryData from '../utils/getWineryData'

export const WineryScreen = ({ navigation, reviews, user, isAuthenticated, wineryList }) => {
  const [wineryData, updateWineryData] = useState({})
  const [wineListData, updateWineListData] = useState([])
  const [eventsArray, updateEventsArray] = useState([])
  const [wineryImages, updateWineryImages] = useState([])
  const [filteredReviews, updatedFilteredReviews] = useState([])
  const [userRating, updateUserRating] = useState(0)
  const [isLoading, updateIsLoading] = useState(true)
  const winery = navigation.getParam('winery')

  useEffect(() => {
    getWineryData(winery)
      .then(res => {
        updateWineryData(res.data.winery)
        updateWineListData(res.data.wines)
      })
      .catch(err => console.error(err))
    getEventsData(winery)
      .then(res => {
        updateEventsArray(res.data.events)
      })
      .catch(err => console.error(err))
  }, [navigation])

  useEffect(() => {
    getUserRatingHandler()
    getWineryImages(wineryData._id)
      .then(res => {
        updateWineryImages(res.data.images)
      })
      .catch(err => console.error(err))
  }, [wineryData])

  useEffect(() => {
    filterReviews()
  }, [reviews])

  function getUserRatingHandler() {
    if (isAuthenticated) {
      getUserRating()
        .then(res => updateUserRating(res.data.review))
        .then(() => updateIsLoading(false))
        .catch(err => console.error(err))
    }
    updateIsLoading(false)
  }

  function filterReviews() {
    if (reviews) {
      const filtered = reviews.filter(review => winery === review.reviewedId.name)
      updatedFilteredReviews(filtered)
    }
  }

  let postReviewBtn = (
    <Button
      testID="post-review-btn"
      style={styles.postReviewBtn}
      onPress={() => navigation.navigate('NewReview', { wineryData, user, avgRating: calculateAverage(wineryData.avgRating, wineryData.reviewCount) })}>
      <Icon
        type="FontAwesome"
        name='plus' />
      <Text style={styles.postReviewBtnText}>Add a new review</Text>
    </Button>
  )

  if (!isAuthenticated) {
    postReviewBtn = null
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Content>
      <View>
        <View>
          <TouchableOpacity
            testID="gallery-link" 
            onPress={() => navigation.navigate('Gallery', { images: wineryImages, wineryData, user, isAuthenticated })}>
            <ImageBackground 
              source={require('../assets/wineGlasses.jpg')}
              style={styles.imageBackground}>
              <Text style={styles.imageText}>See all images</Text>
            </ImageBackground>
          </TouchableOpacity>
          <BlockHeader 
            data={wineryData} 
            rating={calculateAverage(wineryData.avgRating, wineryData.reviewCount)}
            userRating={userRating}
            isAuthenticated={isAuthenticated}
          />
        </View>
        <Tabs 
          style={styles.tabs}
          tabBarUnderlineStyle={{backgroundColor: '#620014'}}>
          <Tab 
            heading="Reviews" 
            activeTextStyle={{color: '#620014'}}
          >
            {postReviewBtn}
            <ReviewList 
              reviews={filteredReviews}
              navigation={navigation}/>
          </Tab>
          <Tab 
            heading="Wines" 
            activeTextStyle={{color: '#620014'}}
          >
            <WineryWineList
              user={user}
              isAuthenticated={isAuthenticated}
              wineryList={wineryList} 
              wineArray={wineListData}
              navigation={navigation}
            />
          </Tab>
          <Tab 
            heading="Wine Clubs" 
            activeTextStyle={{color: '#620014'}}
          >
            <View>
              <Text
                testID="club-link"
                onPress={() => navigation.navigate('Comparison')} 
                style={styles.compareLink}>
                Compare wine club benefits
              </Text>
            </View>
            <ClubList 
              clubs={wineryData.wineClubs} 
              navigation={navigation}/>
          </Tab>
          <Tab 
            heading="Events" 
            activeTextStyle={{color: '#620014'}}
          >
            <EventList 
              events={eventsArray}
              navigation={navigation}/>
          </Tab>
          <Tab 
            heading="Info" 
            activeTextStyle={{color: '#620014'}}
          >
            <WineryInfo info={wineryData}/>
          </Tab>
        </Tabs>
      </View>
    </Content>
  )
}

WineryScreen.navigationOptions = {
  title: 'Winery Name',
  headerStyle: {
    backgroundColor: '#fcf1d2'
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%', 
    paddingVertical: 40,
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  imageText: {
    backgroundColor: 'white',
    marginRight: 10,
    paddingVertical: 2,
    paddingHorizontal: 4
  },
  tabs: {
    backgroundColor: '#ede1c4'
  },
  block: {
    width: '80%',
    marginVertical: 0,
    marginHorizontal: 'auto'
  },
  compareLink: {
    textAlign: 'center',
    backgroundColor: '#fcf1d2',
    paddingVertical: 15,
    color: '#620014',
    fontWeight: '500'
  },
  postReviewBtn: {
    backgroundColor: '#620014',
    justifyContent: 'center',
  },
  postReviewBtnText: {
    textAlign: 'center',
  }
})

const mapStateToProps = (state) => {
  return {
    reviews: state.reviewReducer.reviews.data.reviews,
    user: state.authReducer.user.user,
    isAuthenticated: state.authReducer.isAuthenticated,
    wineryList: state.wineReducer.wineriesList
  }
}

export default connect(mapStateToProps)(WineryScreen)