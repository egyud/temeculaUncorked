import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WineCard from './WineCard'

export default WineList = ({ wines, navigation, user, isAuthenticated }) => {
  return (
    <View testID="wine-list">
      {wines.map(wine => (
        <WineCard
          user={user}
          isAuthenticated={isAuthenticated} 
          key={wine._id} 
          wine={wine}
          navigation={navigation}/>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({

})