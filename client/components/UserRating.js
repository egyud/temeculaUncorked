import React from 'react'
import { Rating } from 'react-native-ratings'

export default UserRating = ({ value, rateFunc }) => {
  return (
    <Rating 
      imageSize={25} 
      startingValue={value}
      type="custom"
      ratingColor="#614d36"
      onFinishRating={rateFunc} 
    />
  )
}