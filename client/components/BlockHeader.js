import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, CardItem, Text, Button, Icon, Left, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings'
import UserRating from '../components/UserRating'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import calculateAverage from '../utils/average'

export default BlockHeader = ({ data, rating, userRating, isAuthenticated, navigation, user }) => {
  const { name, phone, reviewCount } = data

  let postReviewBtn = (
    <Button
      testID="post-review-btn"
      style={styles.postReviewBtn}
      onPress={() => navigation.navigate('NewReview', { wineryData: data, user, avgRating: calculateAverage(data.avgRating, reviewCount) })}>
      <Text style={styles.postReviewBtnText}>Add a new review</Text>
    </Button>
  )

  if (!isAuthenticated) {
    postReviewBtn = null
  }

  let uRate = (
    <>
      <UserRating
        disabled={true} 
        size={25}
        value={userRating}
      />
      <Text testID="user-rating-text">Your rating</Text>
    </>
  )
  return (
    <Card
      testID="block-header" 
      style={styles.block}>
      <CardItem >
        <Left>
          <Body>
            <Text style={styles.wineryName}>{name}</Text>
          </Body>
        </Left>
        <Right>
          <Rating
            readonly={true}
            imageSize={25} 
            startingValue={rating}
            type="custom"
            ratingColor='#fcf1d2' />
          <Text style={styles.reviewCount}>{reviewCount} Reviews</Text>
          {isAuthenticated ? uRate : null}
        </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Button style={styles.callButton}>
            <Icon
              style={{ color: '#620014', marginRight: 0 }}
              type="FontAwesome"
              name='phone' />
            <Text style={styles.callText}>{phone}</Text>
          </Button>
        </Left>
        <Right>
          {postReviewBtn}
        </Right>
      </CardItem>
    </Card>
  )
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff'
  },
  wineryName: {
    fontSize: hp('3%'),
    fontWeight: 'bold'
  },
  callButton: {
    backgroundColor: '#fcf1d2',
    borderColor: '#620014',
    borderWidth: 3,
  },
  callText: {
    color: '#620014',
    fontWeight: '700',
    fontSize: hp('1.8%'),
  },
  reviewCount: {
    fontSize: hp('1.7%')
  },
  postReviewBtn: {
    backgroundColor: '#fcf1d2',
    borderColor: '#620014',
    borderWidth: 3,
    justifyContent: 'center',
  },
  postReviewBtnText: {
    textAlign: 'center',
    fontSize: hp('1.6%'),
    color: '#620014',
    fontWeight: 'bold'
  }
})