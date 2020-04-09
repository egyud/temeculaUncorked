import React, { useState } from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-native'
import { Textarea, Form, Button, Text } from 'native-base'
import { showMessage } from 'react-native-flash-message'

export default PostCommentScreen = ({ navigation }) => {
  const [commentText, updateCommentText] = useState('')

  const activeUser = navigation.getParam('activeUser')
  const review = navigation.getParam('review')
  const event = navigation.getParam('event')
  const type = navigation.getParam('type')

  function postComment() {
    if (type === 'review') {
      axios.post(`http://localhost:5000/api/comments`, {
        text: commentText,
        userId: activeUser._id,
        reviewId: review._id
      })
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
      axios.post(`http://localhost:5000/api/comments/event`, {
        text: commentText,
        userId: activeUser._id,
        eventId: event._id
      })
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
          rowSpan={5} 
          bordered
          placeholder="Type your comment here"
          onChangeText={(text) => updateCommentText(text)}
          style={styles.textArea} />
        <Button 
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
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  postCommentScreen: {
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
})