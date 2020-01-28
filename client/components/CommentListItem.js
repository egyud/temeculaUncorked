import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base'
import moment from 'moment'

export default CommentListItem = ({ comment, navigation }) => {
  const { timestamp, text, likes, userId: { name: userName, _id: userId, avatar } } = comment

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
    <View>
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
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
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

})