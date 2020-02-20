import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'native-base'

export default ClubColumnItem = ({ title, body, number }) => {
  
  let bodyContent
  if (title !== 'Discounts' && title !== 'Other Benefits') {
    bodyContent = <Text>{body}</Text>
  } else {
    bodyContent = (
      <>
        {body.map(el => <Text>{el}</Text>)}
      </>
    )
  }
  
  return (
    <View style={[styles.row, number === 1 ? styles.dark : styles.light]}>
      <Text note>{title}</Text>
      {bodyContent}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#fff',
    overflow: 'scroll',
    borderRadius: 30
  },
  light: {
    backgroundColor: '#e6ffe6',
  },
  dark: {
    backgroundColor: '#99ff99'
  }
})