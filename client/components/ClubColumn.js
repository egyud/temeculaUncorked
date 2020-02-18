import React from 'react'
import { View, StyleSheet } from 'react-native'
import ClubColumnItem from './ClubColumnItem'

export default ClubColumn = ({ club }) => {
  const { name, winery, tastings, shipments, discounts, otherBenefits, avgPrice } = club

  return (
    <View style={styles.column}>
      <ClubColumnItem title="Club" body={name}/>
      <ClubColumnItem title="Winery" body={winery}/>
      <ClubColumnItem title="Tastings" body={tastings}/>
      <ClubColumnItem title="Pickups/Shipments" body={shipments}/>
      <ClubColumnItem title="Discounts" body={discounts}/>
      <ClubColumnItem title="Other Benefits" body={otherBenefits}/>
      <ClubColumnItem title="Avg. Price" body={avgPrice}/>
    </View>
  )
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'stretch',
    width: '70%',
    paddingHorizontal: 0
  }
})