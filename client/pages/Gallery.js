import React, { useState, useEffect } from 'react'
import { Dimensions, View, StyleSheet, Text } from 'react-native'
import ImageView from 'react-native-image-viewing'
import GalleryImage from '../components/GalleryImage'

export default Gallery = ({ navigation }) => {
  const [index, updateIndex] = useState(0)
  const [shown, updateShown] = useState(false)
  // const [imgList, updateImgList] = useState([])
  const [isLoading, updateIsLoading] = useState(true)
  const images = navigation.getParam('images')
  let imageArray = []

  // console.log('imageArray')
  // console.log(imageArray)

  // create an array of just the urls for each image
  useEffect(() => {
    if (images) {
      images.forEach(img => {
        // let uri = img.url
        imageArray.push(img.url)
        console.log('imageArray')
        console.log(imageArray)
        // updateImgList(prevList => [...prevList, img.url])
        // console.log('image list')
        // console.log(imgList)
      })
    }
  }, [])

  useEffect(() => {
    if (imageArray.length > 0) {
      updateIsLoading(false)
    }
  }, [imageArray])

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
        <Text>Loading Images...</Text>
      </View>
    )
  }

  console.log('right before return')
  return (
    <View style={styles.gallery}>
      {imageArray.map((image, idx) => (
        <GalleryImage
          uri={image} 
          index={idx}
          key={idx}
          onPress={openLightBox}
        />
      ))}
      <ImageView
        images={imageArray} 
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