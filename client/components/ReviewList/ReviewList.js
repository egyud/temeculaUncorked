import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'
import Review from '../Review'
import addLike from '../../utils/addLike'


export default ReviewList = ({ reviews, navigation, isProfileScreen }) => {
  return (
    <View testID="review-list">
      {/* <ScrollView> */}
        {reviews.map(review => (
          <Review
            isProfileScreen={isProfileScreen} 
            key={review._id}
            review={review}
            navigation={navigation}
            addLike={addLike}/>
        ))}
      {/* </ScrollView> */}
    </View>
  )
}

const styles = StyleSheet.create({

})