import React from 'react'
import moment from 'moment'
import modifyTimestamp from '../utils/modifyTimestamp'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text, Spinner } from 'native-base'

export default ActivityFeed = ({ navigation, reviews, isLoading }) => {

  if (isLoading) {
    return <Spinner testID="spinner"/>
  }

  return (
    <List testID="activity-feed">
      {reviews.map(review => {
        let avatar = null
        if (review.userId.avatar !== undefined) {
          avatar = <Thumbnail source={{ uri: review.userId.avatar.url }}/>
        }

        return (
          <TouchableHighlight
            style={styles.listItem} 
            onPress={() => navigation.navigate('Review', { review })} 
            key={review._id}
          >
            <ListItem
              testID="activity-feed-item" 
              avatar  
            >
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
          </TouchableHighlight>
        )
      })}
    </List>
  )
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#ede1c4'
  }
})