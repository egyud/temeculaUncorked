import React from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import ClubColumnItem from './ClubColumnItem'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default ClubColumn = ({ club }) => {
  const { name, winery, tastings, shipments, discounts, otherBenefits, avgPrice } = club
 
  return (
    <View 
      testID="club-column"
      style={styles.column}>
      <Text style={styles.headText}>{winery}</Text>
      <Text style={styles.headText}>{name}</Text>
      <ScrollView style={styles.columnScroll}>
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
  },
  headText: {
    textAlign: 'center',
    fontSize: hp('1.8%')
  },
  columnScroll: {
    marginTop: hp('1.2%')
  }
})