import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import { View, StyleSheet, Image } from 'react-native'
import { Button, Text } from 'native-base'

export default PhotoPickerScreen = ({ navigation }) => {
  const [cameraRollPermissions, updateCameraRollPermissions] = useState(null)
  const [image, updateImage]= useState(null)
  const [photo, updatePhoto] = useState(null)
  
  const wineryData = navigation.getParam('wineryData')
  const user = navigation.getParam('user')

  useEffect(() => {
    openImagePicker()
  }, [])

  useEffect(() => {
    if(photo !== null) {
      savePhoto()
    }
  }, [photo])

  async function openImagePicker() {
    try {   
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
  
      if (status !== 'granted') {
        alert('Permission to access camera roll is required!')
        return
      }
  
      updateCameraRollPermissions(true)
    } catch (error) {
      console.error(error)
    }

  }

  async function getPhotoLibrary() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true
      })
      if (result.cancelled) {
        return
      }
      updateImage({ localUri: result.uri })

      let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dkoz1ezfx/upload'

      let base64Img = `data:image/jpg;base64,${result.base64}`;


      let data = {
        "file": base64Img,
        "upload_preset": 'opgmep7s'
      }

      fetch(CLOUDINARY_URL, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(async res => {
        let resData = await res.json()
        updatePhoto(resData.url)
      }).catch(err => console.error(err))
    } catch (error) {
      console.error(error)
    }
  }

  function savePhoto() {
    axios.post('http://localhost:5000/api/images', {
      activeUserId: user._id,
      wineryId: wineryData._id,
      url: photo
    })
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }

  // function handleUploadPhoto() {
  //   if (!user) {
  //     console.log('you must be logged in to do that')
  //     return
  //   }
  //   console.log('image')
  //   console.log(image)
  //   let formData = new FormData()
  //   formData.append('image', { uri: image.uri, type: image.type, name: '' })
  //   formData.append('activeUserId', user._id)
  //   formData.append('winery', wineryData._id)

  //   if (image) {
  //     axios.post(`http://localhost:5000/api/images`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     })
  //         .then(res => console.log(res))
  //         .catch(err => console.error(err))
  //   }
  // }

  if (cameraRollPermissions === null) {
    return <View />
  } else if (cameraRollPermissions === false) {
    return <Text>Access to camera has been denied.</Text>
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {photo ? (
            <Image 
              source={{ uri: photo }}
              style={{ flex: 1 }}/>
          ) : (
            <View />
          )}
        </View>
        <View>
          <Button onPress={() => getPhotoLibrary()}>
            <Text>Photo Picker Screen</Text>
          </Button>
          {photo ? (
            <Button onPress={() => handleUploadPhoto()}>
              <Text>Upload Photo</Text>
            </Button>
          ) : null}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})