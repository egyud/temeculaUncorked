import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings' 
import { wineries } from '../../wineries'

export default WineryList = () => {
  return (
    <View>
      {wineries.map(winery => (
        <ListItem>
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

const styles = StyleSheet.create({
  
})