import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, CheckBox, Text, Body } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default WineFilterItem = ({ text, addToFilters }) => {
  const [checked, updateChecked] = useState(false)

  function handlePress(value) {
    addToFilters(value)
    updateChecked(!checked)
  }

  return (
    <View
      testID="wine-filter-item" 
      style={styles.wineFilterItem}>
      <ListItem>
        <CheckBox 
          checked={checked}
          onPress={() => handlePress(text)}/>
        <Body>
          <Text style={styles.text}>{text}</Text>
        </Body>
      </ListItem>
    </View>
  )
}

const styles = StyleSheet.create({
  wineFilterItem: {
  },
  text: {
    fontSize: hp('1.6%')
  }
})