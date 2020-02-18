import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'native-base'

export default ClubColumnItem = ({ title, body }) => {
  
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
    <View style={styles.row}>
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
    borderWidth: 1,
  }
})