import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'native-base'

export default ClubColumnItem = ({ title, body, number }) => {
  
  let bodyContent
  let rowStyle
  if (title !== 'Discounts' && title !== 'Other Benefits') {
    rowStyle = styles.row
    bodyContent = <Text>{body}</Text>
  } else {
    rowStyle = styles.rowTall
    bodyContent = (
      <>
        {body.map(el => <Text key={el} style={{ alignSelf: 'center' }}>-{el}</Text>)}
      </>
    )
  }
  
  return (
    <View
      testID="column-item" 
      style={[rowStyle, number === 1 ? styles.dark : styles.light]}>
      <Text note style={{ alignSelf: 'center' }}>{title}</Text>
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
    borderRadius: 25,
    marginBottom: 10,
    height: 150
  },
  rowTall: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#fff',
    overflow: 'scroll',
    borderRadius: 25,
    marginBottom: 10,
    height: 300,
    paddingHorizontal: 15
  },
  light: {
    backgroundColor: '#fcf1d2',
    // backgroundColor: '#ede1c4'
  },
  dark: {
    // backgroundColor: '#ede1c4',
    backgroundColor: '#f9e8c0'
  },
  lightText: {
    // color: '#e6ffe6',
  },
})