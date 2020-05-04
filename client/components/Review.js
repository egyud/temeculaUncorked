import React from 'react'
import axios from 'axios'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings' 
import ReportBtn from './ReportBtn'
import modifyTimestamp from '../utils/modifyTimestamp'
import moment from 'moment'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default Review = ({ review, navigation, activeUserId, isProfileScreen, addLike }) => {
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
          <Text
            style={styles.text}
            testID="user-name" 
            onPress={() => navigation.navigate('Profile', { userId: userId })}>{userName}</Text>
        </Body>
      </>
    )
  }

  return (
    <View testID="review">
      <Card style={styles.reviewCard}>
        <CardItem>
          <Left>
            {topLeft}
          </Left>
          <Right>
            <Text style={styles.text}>{moment(modifyTimestamp(timestamp)).fromNow()}</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Rating
              readonly={true} 
              startingValue={rating}
              imageSize={25}
              type="custom"
              ratingColor='#fcf1d2' />
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Body>
            <Text style={styles.text}>{text}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button
              testID="add-like-button" 
              transparent
              onPress={() => addLike('reviews', activeUserId, _id)}>
              <Icon
                style={styles.btns} 
                active name="thumbs-up" />
              <Text style={styles.btns}>{likes.length} Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button
              testID="view-comments" 
              style={styles.viewCommentsWrapper}
              transparent
              onPress={() => navigation.navigate('Review', { review: review })}>
              <Icon
                style={styles.btns}
                active name="chatbubbles" />
              <Text style={styles.btns}>View Comments</Text>
            </Button>
          </Body>
          <Right>
            <ReportBtn />
          </Right>
        </CardItem>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  btns: {
    color: '#620014',
    paddingHorizontal: 0,
    fontSize: hp('1.5%')
  },
  viewCommentsWrapper: {
    justifyContent: 'center',
  },
  reviewCard: {
    paddingHorizontal: wp('5%')
  },
  text: {
    fontSize: hp('1.7%')
  }
})