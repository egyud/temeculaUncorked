import React from 'react'
import { View, StyleSheet } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'
import addLike from '../utils/addLike'
import CommentListItem from './CommentListItem'


export default CommentList = ({ comments, activeUserId }) => {

  if (comments && comments.length > 0) {
    return (
      <View style={styles.container}>
        {comments.map(comment => (
          <CommentListItem 
            key={comment._id}
            comment={comment}
            activeUserId={activeUserId}
            addLike={addLike}/>
        ))}
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>No comments to display</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 25,
    marginTop: 0,
  }
})