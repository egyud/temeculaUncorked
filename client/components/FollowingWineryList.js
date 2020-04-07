import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'

export default FollowingWineryList = ({ navigation, wineries }) => {

  if (wineries && wineries.length > 0) {
    return (
      <List>
        {wineries.map(winery => (
          <ListItem
            testID="following-winery-item"
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
    backgroundColor: '#e6ffe6'
  }
})