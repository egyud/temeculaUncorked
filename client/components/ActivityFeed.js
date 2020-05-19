import React from 'react'
import moment from 'moment'
import modifyTimestamp from '../utils/modifyTimestamp'
import { StyleSheet, TouchableHighlight } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text, Spinner } from 'native-base'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

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
                <Text style={styles.text}>{review.userId.name}</Text>
                <Text style={styles.text} note>Reviewed {review.reviewedId.name}</Text>
              </Body>
              <Right>
                <Text style={styles.text} note>{moment(modifyTimestamp(review.timestamp)).fromNow()}</Text>
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
  },
  text: {
    fontSize: hp('1.6%')
  }
})