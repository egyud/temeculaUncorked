import React, { useState, useEffect } from 'react'
import { Dimensions, View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Spinner } from 'native-base'
import ImageView from 'react-native-image-viewing'
import GalleryImage from '../components/GalleryImage'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default Gallery = ({ navigation }) => {
  const [index, updateIndex] = useState(0)
  const [shown, updateShown] = useState(false)
  const [imgList, updateImgList] = useState([])
  const [isLoading, updateIsLoading] = useState(true)
  const images = navigation.getParam('images')
  const wineryData = navigation.getParam('wineryData')
  const user = navigation.getParam('user')
  const isAuthenticated = navigation.getParam('isAuthenticated')
  let imageArray = []

  // create an array of just the urls for each image
  useEffect(() => {
    if (images) {
      images.forEach(img => {
        imageArray.push({ uri: img.url })
      })
      updateImgList(imageArray)
      updateIsLoading(false)
    }
  }, [])

  const openPhotoPicker = () => {
    if (isAuthenticated) {
      navigation.navigate('PhotoPicker', { wineryData, user })
    }
  }

  const openLightBox = (i) => {
    updateIndex(i),
    updateShown(true)
  }
  
  const hideLightBox = () => {
    updateIndex(0)
    updateShown(false)
  }


  if (isLoading) {
    return (
      <View>
        <Spinner testID="spinner"/>
      </View>
    )
  }

  console.log(imgList)
  return (
    <View style={styles.gallery}>
      <TouchableOpacity
        onPress={() => openPhotoPicker()} 
        style={styles.upload}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('1.6%')}}>Upload Photos</Text>
      </TouchableOpacity>
      {imgList.map((image, idx) => (
        <GalleryImage
          uri={image.uri} 
          index={idx}
          key={idx}
          onPress={openLightBox}
        />
      ))}
      <ImageView
        images={imgList} 
        visible={shown}
        imageIndex={index}
        onRequestClose={() => hideLightBox()}
      />
    </View>
  )
}

Gallery.navigationOptions = {
  title: 'Gallery',
  headerStyle: {
    backgroundColor: '#fcf1d2'
  }
}

const styles = StyleSheet.create({
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  upload: {
    width: '100%',
    height: 40,
    backgroundColor: '#89012c',
    justifyContent: 'center',
    alignItems: 'center'
  }
})