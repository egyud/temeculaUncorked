import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings' 
import { wineries } from '../../fakeData/wineries'

export default WineryList = () => {
  return (
    <View style={styles.container}>
      {wineries.map(winery => (
        <ListItem style={styles.listItem}>
          <Body>
            <Text>{winery}</Text>
          </Body>
          <Right>
            <Rating imageSize={25}/>
          </Right>
        </ListItem>
      ))}
    </View>
  )
}

WineryList.navigationOptions = {
  title: 'Wineries',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  listItem: {
    backgroundColor: '#fff'
  }
})

