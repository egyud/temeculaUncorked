import React, { useState } from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-native'
import { Textarea, Form, Button, Text } from 'native-base'
import { showMessage } from 'react-native-flash-message'
import { postEventComment, postReviewComment } from '../utils/postComment'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default PostCommentScreen = ({ navigation }) => {
  const [commentText, updateCommentText] = useState('')

  const activeUser = navigation.getParam('activeUser')
  const review = navigation.getParam('review')
  const event = navigation.getParam('event')
  const type = navigation.getParam('type')

  function postComment() {
    if (commentText.length === 0) {
      showMessage({
        mesage: 'Please fill out the comment form',
        type: 'warning'
      })
      return
    }

    if (type === 'review') {
      postReviewComment(commentText, activeUser._id, review._id)
        .then(res => {
          showMessage({
            message: res.data.message,
            type: 'success'
          })
          navigation.navigate('Review', { review })
        })
        .catch(err => {
          showMessage({
            message: err.response.data.message,
            type: 'warning'
          })
        })
    } else if (type === 'event') {
      postEventComment(commentText, activeUser._id, event._id)
        .then(res => {
          showMessage({
            message: res.data.message,
            type: 'success'
          })
        })
        .catch(err => {
          showMessage({
            message: err.response.data.message,
            type: 'warning'
          })
          navigation.navigate('Event', { event })
        })
    }
  }

  return (
    <View style={styles.postCommentScreen}>
      <Text>Post a new comment</Text>
      <Form style={{ alignItems: 'center' }}>
        <Textarea
          testID="text-area" 
          rowSpan={5} 
          bordered
          placeholder="Type your comment here"
          onChangeText={(text) => updateCommentText(text)}
          style={styles.textArea}
          value={commentText} />
        <Button
          testID="submit-button" 
          onPress={() => postComment()}
          style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </Button>
      </Form>
    </View>
  )
}

PostCommentScreen.navigationOptions = {
  title: 'Post a new comment',
  headerStyle: {
    backgroundColor: '#fcf1d2'
  }
}

const styles = StyleSheet.create({
  postCommentScreen: {
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
    borderColor: '#620014',
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
})