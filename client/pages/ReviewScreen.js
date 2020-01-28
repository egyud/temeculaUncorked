import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-native'
import Review from '../components/Review'
import CommentList from '../components/CommentList'

export default ReviewScreen = ({ navigation }) => {
  const [commentsList, updateCommentsList] = useState([])
  // const reviewId = navigation.getParam('reviewId')
  const review = navigation.getParam('review')
  const { _id: reviewId } = review 

  useEffect(() => {
    getComments()
  }, [])

  console.log('in reviewScreen')
  console.log(review)
  console.log(commentsList)

  function getComments() {
    axios.get(`http://localhost:5000/api/comments/${reviewId}`)
      .then(res => updateCommentsList(res.data.comments))
      .catch(err => console.error(err))
  }

  return (
    <View>
      <Review review={review} navigation={navigation}/>
      <CommentList comments={commentsList}/>
    </View>
  )
}

const styles = StyleSheet.create({

})