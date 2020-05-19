import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Textarea, Form, Button, Text } from 'native-base'
import { Rating } from 'react-native-ratings'
import postReview from '../utils/postReview'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default PostReviewScreen = ({ navigation }) => {
  const [reviewText, updateReviewText] = useState('')
  const [rating, updateRating] = useState(0)

  const user = navigation.getParam('user')
  const wineryData = navigation.getParam('wineryData')

  function submit() {
    if (reviewText.length > 0 && rating > 0) {
      postReview(wineryData.name, user, reviewText, rating, navigation)
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
          startingValue={0}
          onFinishRating={(rating) => updateRating(rating)}
          type="custom"
          ratingColor='#fcf1d2' />
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
    backgroundColor: '#fcf1d2'
  },
}

const styles = StyleSheet.create({
  postReviewScreen: {
    backgroundColor: '#fff',
    height: '100%'
  },
  submitBtn: {
    backgroundColor: '#620014',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 25,
    borderColor: '#ede1c4',
    borderWidth: 1
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('1.6%')
  },
  textArea: {
    borderColor: '#fcf1d2',
    width: wp('90%'),
    backgroundColor: '#fcf1d2',
    borderRadius: 20,
    fontSize: hp('1.6%')
  },
  rating: {
    marginVertical: 30
  },
})