import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'

export default FollowingList = ({ navigation, users }) => {

  if (users && users.length > 0) {
    return (
      <List>
        {users.map(user =>  {
          let thumbnail
          if (user.avatar === undefined) {
            thumbnail = null
          } else {
            thumbnail = <Thumbnail testID="thumbnail-avatar" source={{ uri: user.avatar.url }}/>
          }
          return (
            <TouchableHighlight
              key={user._id}
              onPress={() => navigation.navigate('Profile', { userId: user._id })}
              style={styles.listItem}
            >
              <ListItem
                testID="following-list-item"

                avatar>
                <Left>
                  {thumbnail}
                </Left>
                <Body>
                  <Text>{user.name}</Text>
                </Body>
              </ListItem>
            </TouchableHighlight>
          )
        })}
      </List>
    )
  } else {
    return (
      <View>
        <Text>You are not following any users</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fcf1d2'
  }
})