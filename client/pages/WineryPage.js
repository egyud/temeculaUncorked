import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Tabs, Tab, Text, Icon, Button, Content } from 'native-base'
import ImagePicker from 'expo-image-picker'
import EventList from '../components/EventList'
import BlockHeader from '../components/BlockHeader'
import WineList from '../components/WineList'
import WineryInfo from '../components/WineryInfo'
import ReviewList from '../components/ReviewList/ReviewList'
import Review from '../components/Review'
import ClubList from '../components/ClubList'


const WineryPage = ({ navigation, reviews, user, isAuthenticated }) => {
  const [wineryData, updateWineryData] = useState({})
  const [wineListData, updateWineListData] = useState([])
  const [eventsArray, updateEventsArray] = useState([])
  const [wineryImages, updateWineryImages] = useState([])
  const [filteredReviews, updatedFilteredReviews] = useState([])
  const [selectedImage, updateSelectedImage] = useState(null)
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
      .catch(err => console.error(err))
  }

  function getEventsData(selectedWinery) {
    axios.get(`http://localhost:5000/api/events/winery/${selectedWinery}`)
      .then(res => {
        console.log(res.data)
        updateEventsArray(res.data.events)
      })
      .catch(err => console.error(err))
  }

  function getWineryImages(selectedWinery) {
    axios.get(`http://localhost:5000/api/images/${selectedWinery}`)
      .then(res => {
        console.log(res.data.images)
        updateWineryImages(res.data.images)
      })
      .catch(err => console.error(err))
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

  async function openImagePickerAsync () {
    try {
      // let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()
  
      // if (permissionResult.granted === false) {
      //   alert('Permission to access camera roll is required!')
      //   return
      // }
  
      let result = await ImagePicker.launchImageLibraryAsync()
  
      if (result.cancelled) {
        return
      }
      updateSelectedImage({ localUri: result.uri, filename: localUri.split('/').pop() })
    } catch(err) {
      console.error(err)
    }

  }

  function createFormData(photo, body) {      
    const data = new FormData()
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    })
    Object.keys(body).forEach(key => {
      data.append(key, body[key])
    })
    return data
  }

  function handleUploadPhoto() {
    console.log('in handleUploadPhoto()')
    let formData = FormDa
    formData.append('image', selectedImage)
    formData.append('activeUserId', user._id)
    formData.append('winery', wineryData._id)
    if (selectedImage) {
      axios.post(`http://localhost:5000/api/images`, formData)
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
    // let data = createFormData(selectedImage, {
    //   activeUserId: user._id,
    //   wineryId: wineryData._id
    // })
    // axios.post('http://localhost:5000/api/images', data)
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
            source={require('../assets/wineGlasses.jpg')}
            style={styles.imageBackground}>
            <BlockHeader 
              openGallery={() => navigation.navigate('UploadPhoto')}
              submitPhoto={() => handleUploadPhoto()}
              data={wineryData} 
              rating={calculateAverage(wineryData.avgRating, wineryData.reviewCount)}
              choosePhoto={() => navigation.navigate('PhotoPicker', { wineryData, user })}
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
            {postCommentBtn}
            <ReviewList 
              reviews={filteredReviews}
              navigation={navigation}/>
          </Tab>
          <Tab 
            heading="Wines" 
            activeTextStyle={{color: '#89012c'}}
          >
            <WineList 
              wines={wineListData}
              navigation={navigation}/>
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
            <ClubList clubs={wineryData.wineClubs} navigation={navigation}/>
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