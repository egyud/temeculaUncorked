import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'native-base'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default ClubColumnItem = ({ title, body, number }) => {
  
  let bodyContent
  let rowStyle
  // give bigger rows in the column to the items with more content
  if (title !== 'Discounts' && title !== 'Other Benefits') {
    rowStyle = styles.row
    bodyContent = <Text style={styles.text}>{body}</Text>
  } else {
    rowStyle = styles.rowTall
    bodyContent = (
      <>
        {body.map(el => <Text key={el} style={styles.text}>-{el}</Text>)}
      </>
    )
  }
  
  return (
    <View
      testID="column-item" 
      style={[rowStyle, number === 1 ? styles.dark : styles.light]}>
      <Text note style={styles.text}>{title}</Text>
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
    height: 110
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
  },
  dark: {
    backgroundColor: '#f9e8c0'
  },
  text: {
    alignSelf: 'center',
    fontSize: hp('1.6%')
  }
})