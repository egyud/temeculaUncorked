import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Button } from 'native-base'
import { Image } from 'react-native-animatable'

const WIDTH = Dimensions.get('window').width

export default GalleryImage = ({ uri, index, onPress }) => {
  return (
    <Button
      onPress={() => onPress(index)}
      style={styles.imageBtn}
    >
      <Image
        testID="gallery-image" 
        animation={'bounceIn'}
        delay={100 * index}
        duration={500}
        source={{ uri: uri }}
        style={styles.image}
      />
    </Button>
  )
}

const styles = StyleSheet.create({
  imageBtn: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    height: WIDTH / 3,
    width: WIDTH / 3,
  },
  image: {
    height: WIDTH / 3,
    left: 0,
    position: 'absolute',
    resizeMode: 'cover',
    top: 0,
    width: WIDTH / 3,
  }
})