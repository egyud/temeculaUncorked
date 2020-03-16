import React, { useState } from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-native'
import { Textarea, Form, Button, Text } from 'native-base'
import { Rating } from 'react-native-ratings'
import SuccessModal from '../components/SuccessModal'

export default PostReviewScreen = ({ navigation }) => {
  const [reviewText, updateReviewText] = useState('')
  const [rating, updateRating] = useState(0)
  const [successModalVisible, updateSuccessModalVisible] = useState(false)

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
        updateSuccessModalVisible(true)
        // console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }
    
  function closeModal() {
    updateSuccessModalVisible(false)
    navigation.navigate('Winery', { winery: wineryData.name })
  }

  return (
    <View style={styles.postReviewScreen}>
      <SuccessModal 
          close={() => closeModal()}
          modalVisible={successModalVisible}
          review={{
            text: reviewText,
            rating,
            winery: wineryData.name
          }}
      />
      <Form style={{ alignItems: 'center' }}>
        <Rating
          style={styles.rating} 
          imageSize={40}
          startingValue={avgRating}
          onFinishRating={(rating) => updateRating(rating)}
          type="custom"
          ratingColor="#99ff99" />
        <Textarea
          style={styles.textArea} 
          rowSpan={10} 
          bordered
          placeholder="Type your review here"
          onChangeText={(text) => updateReviewText(text)} />
        <Button
          style={styles.submitBtn} 
          onPress={() => postReview()}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </Button>
      </Form>
      
    </View>
  )
}

PostReviewScreen.navigationOptions = {
  title: 'Post a Review',
  headerStyle: {
    backgroundColor: '#99ff99'
  },
}

const styles = StyleSheet.create({
  postReviewScreen: {
    backgroundColor: '#fff',
    height: '100%'
  },
  submitBtn: {
    backgroundColor: '#99ff99',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 25,
    borderColor: '#614d36',
    borderWidth: 1
  },
  submitBtnText: {
    color: '#614d36',
    fontWeight: 'bold'
  },
  textArea: {
    borderColor: '#614d36',
    width: '90%',
    backgroundColor: '#e6ffe6',
    borderRadius: 20
  },
  rating: {
    marginVertical: 30
  },
})