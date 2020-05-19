import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Icon, Text, Button } from 'native-base'
import Review from '../components/Review'
import CommentList from '../components/CommentList'
import addLike from '../utils/addLike'
import getComments from '../utils/getCommentsReview'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export const ReviewScreen = ({ navigation, activeUser, isAuthenticated }) => {
  const [commentsList, updateCommentsList] = useState([])
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

  if (!isAuthenticated) {
    postCommentBtn = null
  }

  return (
    <View style={styles.container}>
      <Review 
        review={review} 
        navigation={navigation}
        activeUser={activeUser}
        style={{ paddingBottom: 0 }}
        addLike={addLike}/>
      {postCommentBtn}
      <CommentList
        activeUser={activeUser}
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
    backgroundColor: '#620014',
    justifyContent: 'center',
  },
  postCommentBtnText: {
    textAlign: 'center',
    fontSize: hp('1.6%')
  }
})

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    activeUser: state.authReducer.user.user
  }
}

export default connect(mapStateToProps)(ReviewScreen)
