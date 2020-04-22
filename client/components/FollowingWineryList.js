import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'

export default FollowingWineryList = ({ navigation, wineries }) => {

  if (wineries && wineries.length > 0) {
    return (
      <List>
        {wineries.map(winery => (
          <TouchableHighlight
            style={styles.listItem} 
            key={winery._id}
            onPress={() => navigation.navigate('Winery', { winery: winery.name })}>
            <ListItem testID="following-winery-item">
              <Body>
                <Text>{winery.name}</Text>
              </Body>
            </ListItem>
          </TouchableHighlight>
        ))}
      </List>
    )
  } else {
    return (
      <View>
        <Text>You are not following any wineries.</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fcf1d2',
  }
})