import React from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base'
import moment from 'moment'

export default CommentListItem = ({ comment, navigation, activeUserId }) => {
  const { _id, timestamp, text, likes, userId: { name: userName, _id: userId, avatar } } = comment

  function addLike() {
    axios.post('http://localhost:5000/api/comments/like', {
      userId: activeUserId,
      commentId: _id
    })
  }

  const modifyTimestamp = () => {
    let newTime = timestamp
      .slice(0, 10)
      .split('-')
      .map(num => Number(num))
    // need to remove one from the month to get right date, as moment starts from index 0
    newTime[1]--
    return newTime
  }

  return (
    <View testID="comment-list-item">
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: avatar.url }}/> 
            <Body>
              <Text>{userName}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Body>
            <Text>{text}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button
              testID="add-like-btn" 
              transparent
              onPress={() => addLike()}>
              <Icon
                style={styles.icons}
                active name="thumbs-up"
               />
              <Text 
                style={styles.icons}>{likes.length} Likes</Text>
            </Button>
          </Left>
          <Right>
            <Text>{moment(modifyTimestamp()).fromNow()}</Text>
          </Right>
        </CardItem>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  icons: {
    color: '#614D36'
  }
})