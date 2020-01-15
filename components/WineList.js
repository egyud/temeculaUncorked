import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings' 
import { wineList } from '../wineList'

export default WineList = () => {
  return (
    <View>
      {wineList.map(wine => (
        <ListItem>
          <Body>
            <Text>{wine.name}</Text>
          </Body>
          <Right>
            <Rating 
              startingValue={wine.rating}
              imageSize={25}/>
          </Right>
        </ListItem>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({

})