import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default HomePageLink = ({ linkText, nav, iconName, typeName }) => {
  return (
    <TouchableOpacity
      testID="home-page-link" 
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
    width: wp('24%'),
    height: hp('12%'),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#fcf1d2',
    justifyContent: 'center',
    alignItems: 'center'
    // overflow: 'hidden'
  },
  icon: {
    color: '#620014'
  }
})