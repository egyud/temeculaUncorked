import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'
import Review from '../Review'


export default ReviewList = ({ reviews, navigation }) => {
  return (
    <View>
      <ScrollView>
        {reviews.map(review => (
          <Review 
            key={review._id}
            review={review}
            navigation={navigation}/>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#e6ffe6'
  }
})