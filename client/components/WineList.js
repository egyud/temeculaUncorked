import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings' 
import WineCard from './WineCard'
import { wineList } from '../fakeData/wineList'

export default WineList = ({ wines }) => {
  return (
    <View>
      {wines.map(wine => (
        <WineCard key={wine._id} wine={wine}/>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({

})