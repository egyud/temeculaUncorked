import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base'
import ReportBtn from './ReportBtn'
import modifyTimestamp from '../utils/modifyTimestamp'
import moment from 'moment'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default CommentListItem = ({ comment, navigation, activeUser, addLike }) => {
  const { _id, timestamp, text, likes, userId: { name: userName, _id: userId, avatar } } = comment

  let avatarThumbnail = null
  if (avatar !== undefined) {
    avatarThumbnail = <Thumbnail source={{ uri: avatar.url }}/>
  }

  if (activeUser && activeUser.blockedUsers.includes(userId)) {
    return null
  }

  return (
    <View testID="comment-list-item">
      <Card style={styles.card}>
        <CardItem>
          <Left>
            {avatarThumbnail}
            <Body>
              <Text style={styles.text}>{userName}</Text>
            </Body>
          </Left>
          <Right>
            <Text style={styles.text}>{moment(modifyTimestamp(timestamp)).fromNow()}</Text>
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Body>
            <Text style={styles.text}>{text}</Text>
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
            <ReportBtn body={text} userName={userName} userId={userId}/>
          </Right>
        </CardItem>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  icons: {
    color: '#620014',
    fontSize: hp('1.5%')
  },
  text: {
    fontSize: hp('1.7%')
  },
  card: {
    paddingLeft: wp('5%')
  }
})