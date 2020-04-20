import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ClubCard from './ClubCard'

export default ClubList = ({ clubs, navigation }) => {
  return (
    <View 
      testID="club-list"
      style={styles.container}>
      {clubs.map(club => (
        <ClubCard 
          key={club._id}
          club={club}
          navigation={navigation}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})