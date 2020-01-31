import React from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings' 
import moment from 'moment'

export default Review = ({ review, navigation }) => {
  const { _id, text, rating, timestamp, userId: { name: userName, _id: userId, avatar }, reviewedId: { name: winery } } = review

  console.log(review.userId)

  function addLike() {
    axios.post('http://localhost:5000/api/reviews/like', {
      // userId: activeUserId,
      reviewId: _id
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
    <View>
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: avatar.url }}/> 
            <Body>
              <Text onPress={() => navigation.navigate('Profile', { userId: userId })}>{userName}</Text>
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
            <Button 
              transparent
              onPress={() => addLike()}>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button 
              transparent
              onPress={() => navigation.navigate('Review', { review: review })}>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
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