import React from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { List, ListItem, Body, Text } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

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
                <Text style={styles.text}>{winery.name}</Text>
              </Body>
            </ListItem>
          </TouchableHighlight>
        ))}
      </List>
    )
  } else {
    return (
      <View>
        <Text style={styles.text}>You are not following any wineries.</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fcf1d2',
  },
  text: {
    fontSize: hp('1.6%')
  }
})