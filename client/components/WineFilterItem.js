import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Header, Content, ListItem, CheckBox, Text, Body } from 'native-base'

export default WineFilterItem = ({ text, addToFilters }) => {
  const [checked, updateChecked] = useState(false)

  function handlePress(value) {
    addToFilters(value)
    updateChecked(!checked)
  }

  console.log(text)

  return (
    <Content style={styles.wineFilterItem}>
      <ListItem>
        <CheckBox 
          checked={checked}
          onPress={() => handlePress(text)}/>
        <Body>
          <Text>{text}</Text>
        </Body>
      </ListItem>
    </Content>
  )
}

const styles = StyleSheet.create({
  wineFilterItem: {
    flex: 1
  }
})