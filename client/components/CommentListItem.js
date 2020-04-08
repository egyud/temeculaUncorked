import React from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base'
import modifyTimestamp from '../utils/modifyTimestamp'
import moment from 'moment'

export default CommentListItem = ({ comment, navigation, activeUserId, addLike }) => {
  const { _id, timestamp, text, likes, userId: { name: userName, _id: userId, avatar } } = comment

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
              onPress={() => addLike('comments', activeUserId, _id)}>
              <Icon
                style={styles.icons}
                active name="thumbs-up"
               />
              <Text 
                style={styles.icons}>{likes.length} Likes</Text>
            </Button>
          </Left>
          <Right>
            <Text>{moment(modifyTimestamp(timestamp)).fromNow()}</Text>
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