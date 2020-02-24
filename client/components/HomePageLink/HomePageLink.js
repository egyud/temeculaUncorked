import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'

export default HomePageLink = ({ linkText, nav, iconName, typeName }) => {
  return (
    <TouchableOpacity 
      style={styles.btn}
      onPress={() => nav()}>
      <Text>
        {linkText}
      </Text>
      <Icon
        style={styles.icon}
        type={typeName}
        name={iconName} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: 100,
    height: 100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#99ff99',
    justifyContent: 'center',
    alignItems: 'center'
    // overflow: 'hidden'
  },
  icon: {
    color: '#614D36'
  }
})