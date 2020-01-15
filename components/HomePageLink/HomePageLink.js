import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native'

export default HomePageLink = ({ linkText, path }) => {
  return (
    <TouchableOpacity style={styles.btn}>
      <Link to={`/${path}`}>
        <Text>
          {linkText}
        </Text>
      </Link>
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