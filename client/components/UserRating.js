import React from 'react'
import { Rating } from 'react-native-ratings'

export default UserRating = ({ value, rateFunc, size, disabled }) => {
  return (
    <Rating
      testID="rating"
      readonly={disabled} 
      imageSize={size} 
      startingValue={value}
      type="custom"
      ratingColor="#620014"
      onFinishRating={rateFunc} 
    />
  )
}