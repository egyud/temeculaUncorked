import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Icon, Text, Button } from 'native-base'
import Review from '../components/Review'
import CommentList from '../components/CommentList'

const ReviewScreen = ({ navigation, activeUser, isAuthenticated }) => {
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
    axios.get(`http://localhost:5000/api/comments/review/${reviewId}`)
      .then(res => updateCommentsList(res.data.comments))
      .catch(err => console.error(err))
  }

  console.log('REVIEW SCREEN RENDERED')
  console.log(activeUser)

  let postCommentBtn = (
    <Button
      style={styles.btnText}
      onPress={() => navigation.navigate('NewComment', { review, activeUser, type: 'review' })}>
      <Icon
        type="FontAwesome"
        name='plus' />
      <Text style={styles.btnText}>Add a new comment</Text>
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
        style={{ paddingBottom: 0 }}/>
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
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnText: {
    textAlign: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    activeUser: state.authReducer.user.user
  }
}

export default connect(mapStateToProps)(ReviewScreen)
