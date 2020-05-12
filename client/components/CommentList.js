import React from 'react'
import { View, StyleSheet } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'
import addLike from '../utils/addLike'
import CommentListItem from './CommentListItem'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default CommentList = ({ comments, activeUser }) => {

  if (comments && comments.length > 0) {
    return (
      <View testID="comment-list" style={styles.container}>
        {comments.map(comment => (
          <CommentListItem 
            key={comment._id}
            comment={comment}
            activeUser={activeUser}
            addLike={addLike}/>
        ))}
      </View>
    )
  } else {
    return (
      <View testID="comment-list" style={styles.container}>
        <Text style={styles.text}>No comments to display</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: wp('8%'),
    marginTop: 0,
  },
  text: {
    fontSize: hp('1.6%')
  }
})