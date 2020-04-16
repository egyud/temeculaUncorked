import React, { useState } from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-native'
import { Textarea, Form, Button, Text } from 'native-base'
import { Rating } from 'react-native-ratings'
import { showMessage } from 'react-native-flash-message'
import postReview from '../utils/postReview'

export default PostReviewScreen = ({ navigation }) => {
  const [reviewText, updateReviewText] = useState('')
  const [rating, updateRating] = useState(0)

  const user = navigation.getParam('user')
  const wineryData = navigation.getParam('wineryData')
  const avgRating = navigation.getParam('avgRating')

  function submit() {
    if (reviewText.length > 0 && rating > 0) {
      postReview(wineryData.name, user, reviewText, rating)
    }
    return
  }

  return (
    <View style={styles.postReviewScreen}>
      <Form style={{ alignItems: 'center' }}>
        <Rating
          testID="review-rating"
          style={styles.rating} 
          imageSize={40}
          startingValue={avgRating}
          onFinishRating={(rating) => updateRating(rating)}
          type="custom"
          ratingColor="#9A8BE7" />
        <Textarea
          testID="review-text-area"
          style={styles.textArea} 
          rowSpan={10} 
          bordered
          placeholder="Type your review here"
          onChangeText={(text) => updateReviewText(text)}
          value={reviewText} />
        <Button
          testID="submit"
          style={styles.submitBtn} 
          onPress={() => submit()}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </Button>
      </Form>
      
    </View>
  )
}

PostReviewScreen.navigationOptions = {
  title: 'Post a Review',
  headerStyle: {
    backgroundColor: '#9A8BE7'
  },
}

const styles = StyleSheet.create({
  postReviewScreen: {
    backgroundColor: '#fff',
    height: '100%'
  },
  submitBtn: {
    backgroundColor: '#9A8BE7',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 25,
    borderColor: '#620014',
    borderWidth: 1
  },
  submitBtnText: {
    color: '#620014',
    fontWeight: 'bold'
  },
  textArea: {
    borderColor: '#620014',
    width: '90%',
    backgroundColor: '#e6ffe6',
    borderRadius: 20
  },
  rating: {
    marginVertical: 30
  },
})