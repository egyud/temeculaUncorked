import React from 'react'
import { View, StyleSheet, Linking } from 'react-native'
import { Button, Text, Icon } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default ReportBtn = ({ body, userName, userId }) => {
  return (
    <Button
      transparent
      style={styles.btn} 
      onPress={() => Linking.openURL(`mailto:support@temeculauncorked.com?subject=Report Content&body=${userName}-${userId}-${body}`)}>
      <Icon
        style={styles.btnText} 
        active name="flag" />
      <Text style={styles.btnText}>Report</Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  btn: {
    // backgroundColor: 'transparent',
  },
  btnText: {
    fontSize: hp('1.6%'),
    color: '#620014'
  }
})