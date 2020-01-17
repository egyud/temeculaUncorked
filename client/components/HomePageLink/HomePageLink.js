import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export default HomePageLink = ({ linkText, nav }) => {
  return (
    <TouchableOpacity 
      style={styles.btn}
      onPress={() => nav()}>
      <Text>
        {linkText}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: 12,
    height: 100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    backgroundColor: '#99ff99',
    justifyContent: 'center',
    alignItems: 'center'
    // overflow: 'hidden'
  }
})