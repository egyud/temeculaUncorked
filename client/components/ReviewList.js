import React from 'react'
import { View, StyleSheet } from 'react-native'
import Review from './Review'
import addLike from '../utils/addLike'

export default ReviewList = ({ activeUser, reviews, navigation, isProfileScreen }) => {
  return (
    <View testID="review-list">
      {reviews.map(review => (
        <Review
          activeUser={activeUser}
          isProfileScreen={isProfileScreen} 
          key={review._id}
          review={review}
          navigation={navigation}
          addLike={addLike}/>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({

})