import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { List, ListItem } from 'native-base'
import { Linking } from 'expo'
import openMap from 'react-native-open-maps'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default WineryInfo = ({ info }) => {
  const { address, hours, url } = info

  function openInBrowser() {
    Linking.openURL(url)
  }

  if (!address || !url || !hours) {
    return (
      <Text>Info is missing for this winery</Text>
    )
  }

  return (
    <List style={styles.container}>
      <Text style={styles.text}>Address</Text>
      <ListItem>
        <Text style={styles.text} onPress={() => openMap({ query: address })}>{address}</Text>
      </ListItem>
      <Text style={styles.text}>Bio</Text>
      <ListItem>
        <Text style={styles.text}>
          Lorem ipsum dolor amet brooklyn synth salvia hammock art party cornhole taxidermy retro. Truffaut DIY taiyaki, flexitarian butcher trust fund selvage bespoke. Taiyaki readymade bicycle rights, bitters bespoke banh mi single-origin coffee humblebrag asymmetrical echo park tousled.
        </Text> 
      </ListItem>
      <Text style={styles.text}>Hours</Text>
      <ListItem>
        <Text style={styles.text}>Monday: {hours.Monday}</Text>
      </ListItem>
      <ListItem>
        <Text style={styles.text}>Tuesday: {hours.Tuesday}</Text>
      </ListItem>
      <ListItem>
        <Text style={styles.text}>Wednesday: {hours.Wednesday}</Text>
      </ListItem>
      <ListItem>
        <Text style={styles.text}>Thursday: {hours.Thursday}</Text>
      </ListItem>
      <ListItem>
        <Text style={styles.text}>Friday: {hours.Friday}</Text>
      </ListItem>
      <ListItem>
        <Text style={styles.text}>Saturday: {hours.Saturday}</Text>
      </ListItem>
      <ListItem>
        <Text style={styles.text}>Sunday: {hours.Sunday}</Text>
      </ListItem>
      <Text style={styles.text}>Website</Text>
      <ListItem>
        <Text style={styles.text} onPress={() => openInBrowser()}>{url}</Text>
      </ListItem>
    </List>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('2%'),
    paddingTop: hp('1%')
  },
  text: {
    fontSize: hp('1.6%')
  }
})