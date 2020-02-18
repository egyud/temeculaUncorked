import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Text, Thumbnail, Button, Icon, Left, Right, Body } from 'native-base'

const ClubCard = ({ club, navigation }) => {
  
  return (
    <Card style={styles.clubCard}>
      <CardItem>
        <Left>
          <Body>
            <Text>{club.name}</Text>
            <Text note>{club.winery}</Text>
          </Body>
        </Left>
        <Right>
          <Body>
            <Text>{club.tastings}</Text>
          </Body>
        </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Button
            style={styles.moreBtn} 
            onPress={() => navigation.navigate('Club', { club })}>
            <Text>More</Text>
          </Button>
        </Left>
        <Right>
          <Body>
            <Text>{club.shipments}</Text>
          </Body>
        </Right>
      </CardItem>
    </Card>
  )
}

const styles = StyleSheet.create({
  // clubCard: {
  //   flex: 1
  // }
  moreBtn: {
    backgroundColor: '#614D36'
  }
})

export default connect(null)(ClubCard)