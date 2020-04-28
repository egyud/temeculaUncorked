import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, Text } from 'native-base'
import WineFilterItem from './WineFilterItem'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default WineFilters = ({ wineryList, addToFilters, isWineryScreen }) => {
  const types = ['red', 'white', 'rosé', 'sparkling', 'dessert']
  let wineryFilters

  if (!isWineryScreen) {
    wineryFilters = (
      <>
        <ListItem
          itemDivider
          testID="winery-divider">
          <Text style={{ fontSize: hp('1.6%') }}>Winery</Text>
        </ListItem>
        {wineryList.map(winery => (
            <WineFilterItem
              key={winery._id}
              addToFilters={addToFilters} 
              text={winery.name}/>
        ))}
      </>
    )
  }

  return (
    <View
      testID="wine-filters"
      style={styles.wineFilters}>
      <ListItem itemDivider>
        <Text>Type</Text>
      </ListItem>
      {types.map(type => (
        <WineFilterItem
          key={type}
          addToFilters={addToFilters} 
          text={type}/>
      ))}
      {wineryFilters}
    </View>
  )
}

const styles = StyleSheet.create({
  wineFilters: {
    // flex: 1
  }
})