import React from 'react'
import { View, StyleSheet } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'
import CommentListItem from './CommentListItem'


export default CommentList = ({ comments }) => {
  if (comments) {
    return (
      <View style={styles.container}>
        {comments.map(comment => (
          <CommentListItem 
            key={comment._id}
            comment={comment}/>
        ))}
      </View>
    )
  } else {
    return (
      <View>
        <Text>No comments to display</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 25,
    marginTop: 0
  }
})