import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import ClubColumnItem from './ClubColumnItem'

export default ClubColumn = ({ club }) => {
  const { name, winery, tastings, shipments, discounts, otherBenefits, avgPrice } = club
 
  return (
    <View 
      testID="club-column"
      style={styles.column}>
      <ScrollView>
        <ClubColumnItem
          number={1} 
          title="Club" 
          body={name}/>
        <ClubColumnItem
          number={2}
          title="Winery" 
          body={winery}/>
        <ClubColumnItem
          number={1} 
          title="Tastings" 
          body={tastings}/>
        <ClubColumnItem
          number={2} 
          title="Pickups/Shipments" 
          body={shipments}/>
        <ClubColumnItem
          number={1} 
          title="Discounts" 
          body={discounts}/>
        <ClubColumnItem
          number={2} 
          title="Other Benefits" 
          body={otherBenefits}/>
        <ClubColumnItem
          number={1} 
          title="Avg. Price" 
          body={avgPrice}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'stretch',
    width: '70%',
    paddingHorizontal: 0,
    borderColor: '#fff',
  }
})