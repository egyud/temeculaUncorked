import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import modifyTimestamp from '../utils/modifyTimestamp'
import { View, StyleSheet } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text, Spinner } from 'native-base'

export default ActivityFeed = ({ navigation }) => {
  const [reviews, updateReviews] = useState([])
  const [isLoading, updateIsLoading] = useState(true)

  useEffect(() => {
    getReviews()
  }, [])

  function getReviews() {
    axios.get('http://localhost:5000/api/reviews/winery/recent')
      .then(res => {
        updateReviews(res.data.reviews)
        updateIsLoading(false)
      })
      .catch(err => console.error(err))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <List>
      {reviews.map(review => {
        let avatar = null
        if (review.userId.avatar !== undefined) {
          avatar = <Thumbnail source={{ uri: review.userId.avatar.url }}/>
        }

        return (
          <ListItem
            testID="activity-feed-item" 
            avatar 
            style={styles.listItem} 
            onPress={() => navigation.navigate('Review', { review })} 
            key={review._id}>
            <Left>
              {avatar}
            </Left>
            <Body>
              <Text>{review.userId.name}</Text>
              <Text note>Reviewed {review.reviewedId.name}</Text>
            </Body>
            <Right>
              <Text note>{moment(modifyTimestamp(review.timestamp)).fromNow()}</Text>
            </Right>
          </ListItem>
        )
      })}
    </List>
  )
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#e6ffe6'
  }
})