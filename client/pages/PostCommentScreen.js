import React, { useState } from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-native'
import { Textarea, Form, Button, Text } from 'native-base'

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
          console.log(res.data)
          navigation.navigate('Review', { review })
        })
        .catch(err => console.error(err))
    } else if (type === 'event') {
      axios.post(`http://localhost:5000/api/comments/event`, {
        text: commentText,
        userId: activeUser._id,
        eventId: event._id
      })
        .then(res => {
          console.log(res.data)
          navigation.navigate('Event', { event })
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <View>
      <Text>Post a new comment</Text>
      <Form>
        <Textarea 
          rowSpan={5} 
          bordered
          placeholder="Type your comment here"
          onChangeText={(text) => updateCommentText(text)} />
        <Button onPress={() => postComment()}>
          <Text>Submit</Text>
        </Button>
      </Form>
    </View>
  )
}

const styles = StyleSheet.create({

})