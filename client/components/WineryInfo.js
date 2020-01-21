import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { List, ListItem } from 'native-base'

export default WineryInfo = ({ info }) => {
  const { address, hours } = info
  return (
    <List>
      <Text>Address</Text>
      <ListItem>
        <Text>{address}</Text>
      </ListItem>
      <Text>Bio</Text>
      <ListItem>
        <Text>
          Lorem ipsum dolor amet brooklyn synth salvia hammock art party cornhole taxidermy retro. Truffaut DIY taiyaki, flexitarian butcher trust fund selvage bespoke. Taiyaki readymade bicycle rights, bitters bespoke banh mi single-origin coffee humblebrag asymmetrical echo park tousled.
        </Text> 
      </ListItem>
      <Text>Hours</Text>
      <ListItem>
        <Text>Monday: {hours.Monday}</Text>
      </ListItem>
      <ListItem>
        <Text>Tuesday: {hours.Tuesday}</Text>
      </ListItem>
      <ListItem>
        <Text>Wednesday: {hours.Wednesday}</Text>
      </ListItem>
      <ListItem>
        <Text>Thursday: {hours.Thursday}</Text>
      </ListItem>
      <ListItem>
        <Text>Friday: {hours.Friday}</Text>
      </ListItem>
      <ListItem>
        <Text>Saturday: {hours.Saturday}</Text>
      </ListItem>
      <ListItem>
        <Text>Sunday: {hours.Sunday}</Text>
      </ListItem>
    </List>
  )
}

const styles = StyleSheet.create({

})