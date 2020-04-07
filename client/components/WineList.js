import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WineCard from './WineCard'

export default WineList = ({ wines, navigation }) => {
  return (
    <View>
      {wines.map(wine => (
        <WineCard 
          key={wine._id} 
          wine={wine}
          navigation={navigation}/>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({

})