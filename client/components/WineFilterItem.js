import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Header, Content, ListItem, CheckBox, Text, Body } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default WineFilterItem = ({ text, addToFilters }) => {
  const [checked, updateChecked] = useState(false)

  function handlePress(value) {
    addToFilters(value)
    updateChecked(!checked)
  }

  return (
    <Content
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
    </Content>
  )
}

const styles = StyleSheet.create({
  wineFilterItem: {
    flex: 1
  },
  text: {
    fontSize: hp('1.6%')
  }
})