import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Tabs, Tab, Text, Icon, Button, Content, Spinner } from 'native-base'
import EventList from '../components/EventList'
import BlockHeader from '../components/BlockHeader'
import WineryInfo from '../components/WineryInfo'
import ReviewList from '../components/ReviewList/ReviewList'
import ClubList from '../components/ClubList'
import WineryWineList from '../components/WineryWineList'

const WineryPage = ({ navigation, reviews, user, isAuthenticated }) => {
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
    getEventsData(winery)
  }, [navigation])

  useEffect(() => {
    getUserRating()
    getWineryImages(wineryData._id)
  }, [wineryData])

  useEffect(() => {
    filterReviews()
  }, [reviews])

  function getWineryData(selectedWinery) {
    axios.get(`http://localhost:5000/api/wineries/page/${selectedWinery}`)
      .then(res => {
        updateWineryData(res.data.winery)
        updateWineListData(res.data.wines)
      })
      .catch(err => console.error(err))
  }

  function getEventsData(selectedWinery) {
    axios.get(`http://localhost:5000/api/events/winery/${selectedWinery}`)
      .then(res => {
        updateEventsArray(res.data.events)
      })
      .catch(err => console.error(err))
  }

  function getWineryImages(selectedWinery) {
    axios.get(`http://localhost:5000/api/images/${selectedWinery}`)
      .then(res => {
        updateWineryImages(res.data.images)
      })
      .catch(err => console.error(err))
  }

  function getUserRating() {
    if (isAuthenticated) {
      axios.get(`http:/localhost:5000/api/reviews/${wineryData._id}/${user._id}`)
        .then(res => updateUserRating(res.data.review))
        .then(res => updateIsLoading(false))
        .catch(err => console.error(err))
    }
    updateIsLoading(false)
  }

  function calculateAverage(totalValue, reviewCount) {
    return Number((totalValue / reviewCount).toFixed(1)) || 0
  }

  function filterReviews() {
    if (reviews) {
      const filtered = reviews.reviews.filter(review => winery === review.reviewedId.name)
      updatedFilteredReviews(filtered)
    }
  }

  let postReviewBtn = (
    <Button
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
          <ImageBackground 
            source={require('../assets/wineGlasses.jpg')}
            style={styles.imageBackground}>
            <BlockHeader 
              openGallery={() => navigation.navigate('Gallery', { images: wineryImages })}
              submitPhoto={() => handleUploadPhoto()}
              data={wineryData} 
              rating={calculateAverage(wineryData.avgRating, wineryData.reviewCount)}
              choosePhoto={isAuthenticated ? () => navigation.navigate('PhotoPicker', { wineryData, user }) : null}
              userRating={userRating}
              isAuthenticated={isAuthenticated}
            />
          </ImageBackground>
        </View>
        <Tabs 
          style={styles.tabs}
          tabBarUnderlineStyle={{backgroundColor: '#89012c'}}>
          <Tab 
            heading="Reviews" 
            activeTextStyle={{color: '#89012c'}}
          >
            {postReviewBtn}
            <ReviewList 
              reviews={filteredReviews}
              navigation={navigation}/>
          </Tab>
          <Tab 
            heading="Wines" 
            activeTextStyle={{color: '#89012c'}}
          >
            <WineryWineList 
              wineArray={wineListData}
              navigation={navigation}
            />
          </Tab>
          <Tab 
            heading="Wine Clubs" 
            activeTextStyle={{color: '#89012c'}}
          >
            <View>
              <Text
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
            activeTextStyle={{color: '#89012c'}}
          >
            <EventList 
              events={eventsArray}
              navigation={navigation}/>
          </Tab>
          <Tab 
            heading="Info" 
            activeTextStyle={{color: '#89012c'}}
          >
            <WineryInfo info={wineryData}/>
          </Tab>
        </Tabs>
      </View>
    </Content>
  )
}

WineryPage.navigationOptions = {
  title: 'Winery Name',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: 'white',
    width: '80%',
    alignItems: 'center',
    paddingVertical: 50
  },
  imageBackground: {
    width: '100%', 
    paddingVertical: 40,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabs: {
    backgroundColor: '#99ff99'
  },
  block: {
    width: '80%',
    marginVertical: 0,
    marginHorizontal: 'auto'
  },
  callButton: {
    backgroundColor: 'white',
  },
  callText: {
    color: '#614D36'
  },
  photoButton: {
    backgroundColor: '#99ff99',
    marginRight: 4
    // backgroundColor: '#89012c'
  },
  photoButtonText: {
    color: '#614D36'
  },
  compareLink: {
    textAlign: 'center',
    backgroundColor: '#99ff99',
    paddingVertical: 15,
    color: '#614d36',
    fontWeight: '500'
  },
  postReviewBtn: {
    backgroundColor: '#614d36',
    justifyContent: 'center',
  },
  postReviewBtnText: {
    textAlign: 'center',
  }
})

const mapStateToProps = (state) => {
  return {
    reviews: state.reviewReducer.reviews.data,
    user: state.authReducer.user.user,
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(WineryPage)