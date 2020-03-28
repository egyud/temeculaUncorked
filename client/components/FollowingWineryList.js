import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'

export default FollowingWineryList = ({ navigation, wineryList, wineries }) => {

  if (wineries.length === 0) {
    return (
      <View>
        <Text>You are not following any wineries.</Text>
      </View>
    )
  }

  return (
    <List>
      {wineries.map(winery => (
        <ListItem
          key={winery._id}
          onPress={() => navigation.navigate('Winery', { winery: winery.name })}
          style={styles.listItem}>
          <Body>
            <Text>{winery.name}</Text>
          </Body>
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