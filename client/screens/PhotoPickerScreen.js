import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import { View, StyleSheet, Image } from 'react-native'
import { Button, Text } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default PhotoPickerScreen = ({ navigation }) => {
  const [cameraRollPermissions, updateCameraRollPermissions] = useState(null)
  const [photo, updatePhoto] = useState(null)
  
  const wineryData = navigation.getParam('wineryData')
  const user = navigation.getParam('user')

  useEffect(() => {
    openImagePicker()
    getPhotoLibrary()
  }, [])

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
    if(wineryData) {
      // if uploading an image for a winery
      axios.post('http://localhost:5000/api/images', {
        activeUserId: user._id,
        wineryId: wineryData._id,
        url: photo
      })
        .then(res => {
          console.log(res.data)
          navigation.navigate('Winery', { winery: wineryData.name })
        })
        .catch(err => console.error(err))
    } else {
      // if uploading an avatar
      axios.post('http://localhost:5000/api/users/avatar', {
        activeUserId: user._id,
        url: photo
      })
        .then(() => navigation.navigate('Account'))
        .catch(err => console.error(err))
    }
  }

  if (cameraRollPermissions === null) {
    return <View />
  } else if (cameraRollPermissions === false) {
    return <Text style={styles.text}>Access to camera has been denied.</Text>
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {photo ? (
            <>
              <Button
              style={styles.btn} 
              onPress={() => savePhoto()}>
                <Text style={styles.text}>Upload Photo</Text>
              </Button>
              <Image 
                source={{ uri: photo }}
                style={{ flex: 1 }}/>
            </>
          ) : (
            <View />
          )}
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#620014',
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    fontSize: hp('1.6%')
  },
  text: {
    fontSize: hp('1.6%')
  }
})