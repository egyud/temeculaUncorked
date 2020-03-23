import React from 'react'
import { Rating } from 'react-native-ratings'

export default UserRating = ({ value, rateFunc, size }) => {
  return (
    <Rating 
      imageSize={size} 
      startingValue={value}
      type="custom"
      ratingColor="#614d36"
      onFinishRating={rateFunc} 
    />
  )
}