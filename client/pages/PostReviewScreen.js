import React, { useState } from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-native'
import { Textarea, Form, Button, Text } from 'native-base'
import { Rating } from 'react-native-ratings'

export default PostReviewScreen = ({ navigation }) => {
  const [reviewText, updateReviewText] = useState('')
  const [rating, updateRating] = useState(0)

  const user = navigation.getParam('user')
  const wineryData = navigation.getParam('wineryData')
  const avgRating = navigation.getParam('avgRating')

  function postReview() {
    axios.post(`http://localhost:5000/api/reviews/winery`, {
      winery: wineryData.name,
      user,
      reviewText,
      rating
    })
      .then(res => {
        console.log(res.data)
        navigation.navigate('Winery', { winery: wineryData.name })
      })
  }

  return (
    <View>
      <Text>Post a new review</Text>
      <Form>
        <Rating 
          imageSize={40}
          startingValue={avgRating}
          onFinishRating={(rating) => updateRating(rating)}
          type="custom"
          ratingColor="#99ff99" />
        <Textarea 
          rowSpan={5} 
          bordered
          placeholder="Type your review here"
          onChangeText={(text) => updateReviewText(text)} />
        <Button onPress={() => postReview()}>
          <Text>Submit</Text>
        </Button>
      </Form>
    </View>
  )
}

PostReviewScreen.navigationOptions = {
  title: 'Post a Review',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({

})