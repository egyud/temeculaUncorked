import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import GallerySwiper from 'react-native-gallery-swiper'

export default ImageGallery = ({ navigation }) => {
  const [imageArray, updateImageArray] = useState([])
  const images = navigation.getParam('images')

  useEffect(() => {
    createDataArray()
  }, [])

  // function createImageArray() {
  //   let imgArray = []
  //   images.forEach(image => {
  //     let imgObj = {
  //       source: { uri: `${image.url}` }
  //     }
  //     imgArray.push(imgObj)
  //   })
  //   updateImageArray(imgArray)
  // }
  function createDataArray() {
    let dataArray = []
    console.log('IDIOT')
    console.log(images)
    images.forEach(image => {
      let imageObj = {
        source: { uri: `${image.url}` }
      }
      dataArray.push(imageObj)
    })
    updateImageArray(dataArray)
  }

  console.log('IMAGE GALLERY RENDERED')

  return (
    <GallerySwiper
      images={imageArray}
      style={{ flex: 1, backgroundColor: '#000' }}/>
  )
}