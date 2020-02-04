import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Tabs, Tab, Text, Icon, Button, Content } from 'native-base'
import { Rating } from 'react-native-ratings' 
import EventList from '../../components/EventList'
import WineClubInfo from '../../components/WineClubInfo'
import BlockHeader from '../../components/BlockHeader'
import WineList from '../../components/WineList'
import WineryInfo from '../../components/WineryInfo'
import ReviewList from '../../components/ReviewList/ReviewList'
import Review from '../../components/Review'

const WineryPage = ({ navigation, reviews, user, isAuthenticated }) => {
  const [wineryData, updateWineryData] = useState({})
  const [wineListData, updateWineListData] = useState([])
  const [eventsArray, updateEventsArray] = useState([])
  const [wineryImages, updateWineryImages] = useState([])
  const [filteredReviews, updatedFilteredReviews] = useState([])
  const winery = navigation.getParam('winery')

  useEffect(() => {
    getWineryData(winery)
    getEventsData(winery)
  }, [navigation])

  useEffect(() => {
    getWineryImages(wineryData._id)
  }, [wineryData])

  useEffect(() => {
    console.log(reviews)
    filterReviews()
  }, [reviews])

  function getWineryData(selectedWinery) {
    axios.get(`http://localhost:5000/api/wineries/page/${selectedWinery}`)
      .then(res => {
        console.log(res.data.winery)
        updateWineryData(res.data.winery)
        updateWineListData(res.data.wines)
      })
  }

  function getEventsData(selectedWinery) {
    axios.get(`http://localhost:5000/api/events/winery/${selectedWinery}`)
      .then(res => {
        console.log(res.data)
        updateEventsArray(res.data.events)
      })
  }

  function getWineryImages(selectedWinery) {
    axios.get(`http://localhost:5000/api/images/${selectedWinery}`)
      .then(res => {
        console.log('***!!*******!!********!!*')
        console.log(res.data.images)
        updateWineryImages(res.data.images)
      })
  }

  function calculateAverage(totalValue, reviewCount) {
    return Number((totalValue / reviewCount).toFixed(1)) || 0
  }

  function filterReviews() {
    if (reviews) {
      console.log('in filterReviews')
      console.log(reviews.reviews)
      const filtered = reviews.reviews.filter(review => winery === review.reviewedId.name)
      updatedFilteredReviews(filtered)
    }
  }

  let postCommentBtn = (
    <Button
      style={styles.btnText}
      onPress={() => navigation.navigate('NewReview', { wineryData, user, avgRating: calculateAverage(wineryData.avgRating, wineryData.reviewCount) })}>
      <Icon
        type="FontAwesome"
        name='plus' />
      <Text style={styles.btnText}>Add a new comment</Text>
    </Button>
  )

  if (!isAuthenticated) {
    postCommentBtn = null
  }

  return (
    <Content>
      <View>
        <View>
          <ImageBackground 
            source={require('../../assets/wineGlasses.jpg')}
            style={styles.imageBackground}>
            <BlockHeader 
              data={wineryData} 
              rating={calculateAverage(wineryData.avgRating, wineryData.reviewCount)}
              openGallery={() => navigation.navigate('Gallery', { images: wineryImages })}/>
          </ImageBackground>
        </View>
        <Tabs 
          style={styles.tabs}
          tabBarUnderlineStyle={{backgroundColor: '#89012c'}}>
          <Tab 
            heading="Reviews" 
            activeTextStyle={{color: '#89012c'}}
          >
            {postCommentBtn}
            <ReviewList 
              reviews={filteredReviews}
              navigation={navigation}/>
          </Tab>
          <Tab 
            heading="Wines" 
            activeTextStyle={{color: '#89012c'}}
          >
            <WineList wines={wineListData}/>
          </Tab>
          <Tab 
            heading="Wine Clubs" 
            activeTextStyle={{color: '#89012c'}}
          >
            <WineClubInfo />
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
  }
})

const mapStateToProps = (state) => {
  console.log('LOOOOOOK HERE')
  console.log(state.reviewReducer.reviews)
  return {
    reviews: state.reviewReducer.reviews.data,
    user: state.authReducer.user.user,
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(WineryPage)