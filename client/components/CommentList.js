import React from 'react'
import { View, StyleSheet } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'
import CommentListItem from './CommentListItem'


export default CommentList = ({ comments }) => {
  if (comments) {
    return (
      <View>
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
  listItem: {
    backgroundColor: '#e6ffe6'
  }
})