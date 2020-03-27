import React, { useState, useEffect } from 'react'
import { Dimensions, View, StyleSheet, Text } from 'react-native'
import { Spinner } from 'native-base'
import ImageView from 'react-native-image-viewing'
import GalleryImage from '../components/GalleryImage'

export default Gallery = ({ navigation }) => {
  const [index, updateIndex] = useState(0)
  const [shown, updateShown] = useState(false)
  const [imgList, updateImgList] = useState([])
  const [isLoading, updateIsLoading] = useState(true)
  const images = navigation.getParam('images')
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
        <Spinner />
      </View>
    )
  }

  console.log(imgList)
  return (
    <View style={styles.gallery}>
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

const styles = StyleSheet.create({
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  }
})