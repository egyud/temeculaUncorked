import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings' 
import moment from 'moment'

export default Review = ({ review }) => {
  const { text, rating, timestamp, userId: { name: userName, _id: userId, avatar }, reviewedId: { name: winery } } = review

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
    <Content>
      <Card>
        <CardItem>
          <Left>
            {/* user avatar */}
            <Thumbnail source={{ uri: avatar.url }}/> 
            <Body>
              <Text>{userName}</Text>
            </Body>
          </Left>
          <Right>
            <Rating 
              startingValue={rating}
              imageSize={25}/>
          </Right>
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
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Text>{moment(modifyTimestamp()).fromNow()}</Text>
          </Right>
        </CardItem>
      </Card>
    </Content>
  )
}

const styles = StyleSheet.create({

})