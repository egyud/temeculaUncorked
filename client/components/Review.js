import React from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings' 
import moment from 'moment'

export default Review = ({ review, navigation, activeUserId, isProfileScreen }) => {
  const { _id, text, rating, likes, timestamp, userId: { name: userName, _id: userId, avatar }, reviewedId: { name: winery } } = review

  let topLeft
  if (isProfileScreen) {
    topLeft = <Text>{winery}</Text>
  } else {
    topLeft = (
      <>
        <Thumbnail
          testID="review-thumbnail" 
          source={{ uri: avatar.url }}/> 
        <Body>
          <Text onPress={() => navigation.navigate('Profile', { userId: userId })}>{userName}</Text>
        </Body>
      </>
    )
  }

  console.log(review.userId)

  function addLike() {
    axios.post('http://localhost:5000/api/reviews/like', {
      userId: activeUserId,
      reviewId: _id
    })
      .then(res => console.log(res))
      .catch(err => console.error(err))

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
            {topLeft}
          </Left>
          <Right>
            <Rating
              readonly={true} 
              startingValue={rating}
              imageSize={25}
              type="custom"
              ratingColor="#99ff99" />
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
              <Icon
                style={styles.btns} 
                active name="thumbs-up" />
              <Text style={styles.btns}>{likes.length} Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button 
              transparent
              onPress={() => navigation.navigate('Review', { review: review })}>
              <Icon
                style={styles.btns}
                active name="chatbubbles" />
              <Text style={styles.btns}>View Comments</Text>
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
  btns: {
    color: '#614D36'
  }
})