import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Icon, Text, Button } from 'native-base'
import Review from '../components/Review'
import CommentList from '../components/CommentList'
import addLike from '../utils/addLike'
import getComments from '../utils/getCommentsReview'

export const ReviewScreen = ({ navigation, activeUser, isAuthenticated }) => {
  const [commentsList, updateCommentsList] = useState([])
  // const reviewId = navigation.getParam('reviewId')
  const review = navigation.getParam('review')
  const { _id: reviewId } = review 

  useEffect(() => {
    getComments(reviewId)
      .then(res => updateCommentsList(res.data.comments))
      .catch(err => console.error(err))
  }, [])

  let postCommentBtn = (
    <Button
      testID="post-comment-btn"
      style={styles.postCommentBtn}
      onPress={() => navigation.navigate('NewComment', { review, activeUser, type: 'review' })}>
      <Icon
        type="FontAwesome"
        name='plus' />
      <Text style={styles.postCommentBtnText}>Add a new comment</Text>
    </Button>
  )

  let activeUserId
  if (isAuthenticated) {
    activeUserId = activeUser._id
  } else {
    // activeUserId = null
    postCommentBtn = null
  }

  return (
    <View style={styles.container}>
      <Review 
        review={review} 
        navigation={navigation}
        activeUserId={activeUserId}
        style={{ paddingBottom: 0 }}
        addLike={addLike}/>
      {postCommentBtn}
      <CommentList
        activeUserId={activeUserId}
        comments={commentsList}/>
    </View>
  )
}

ReviewScreen.navigationOptions = {
  title: 'Review',
  headerStyle: {
    backgroundColor: '#fcf1d2'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6ffe6'
  },
  postCommentBtn: {
    backgroundColor: '#ede1c4',
    justifyContent: 'center',
  },
  postCommentBtnText: {
    textAlign: 'center',
  }
})

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    activeUser: state.authReducer.user.user
  }
}

export default connect(mapStateToProps)(ReviewScreen)
