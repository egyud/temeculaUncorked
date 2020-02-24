import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { View, StyleSheet } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'

export default ActivityFeed = ({ navigation }) => {
  const [reviews, updateReviews] = useState([])

  useEffect(() => {
    getReviews()
  }, [])

  function getReviews() {
    axios.get('http://localhost:5000/api/reviews/winery/recent')
      .then(res => updateReviews(res.data.reviews))
      .catch(err => console.error(err))
  }

  function modifyTimestamp(timestamp) {
    let newTime = timestamp
      .slice(0, 10)
      .split('-')
      .map(num => Number(num))
    // need to remove one from the month to get right date, as moment starts from index 0
    newTime[1]--
    return newTime
  }

  return (
    <List>
      {reviews.map(review => (
        <ListItem 
          avatar style={styles.listItem} 
          onPress={() => navigation.navigate('Review', { review })} 
          key={review._id}>
          <Left>
            <Thumbnail source={{ uri: review.userId.avatar.url }}/>
          </Left>
          <Body>
            <Text>{review.userId.name}</Text>
            <Text note>Reviewed {review.reviewedId.name}</Text>
          </Body>
          <Right>
            <Text note>{moment(modifyTimestamp(review.timestamp)).fromNow()}</Text>
          </Right>
        </ListItem>
      ))}
    </List>
  )
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#e6ffe6'
  }
})