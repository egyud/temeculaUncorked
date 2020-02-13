import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'

export default FollowingList = ({ navigation, users }) => {
  return (
    <List>
      {users.map(user => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', { userId: user._id })}
          key={user._id}
        >
        <ListItem 
          avatar
          style={styles.listItem}>
          <Left>
            <Thumbnail source={{ uri: user.avatar.url }}/>
          </Left>
          <Body>
            <Text>{user.name}</Text>
          </Body>
        </ListItem>
        </TouchableOpacity>
      ))}
    </List>
  )
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#e6ffe6'
  }
})