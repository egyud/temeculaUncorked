import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Text, Thumbnail, Button, Icon, Left, Right, Body } from 'native-base'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default ClubCard = ({ club, navigation }) => {
  
  return (
    <Card style={styles.clubCard} testID="club-card">
      <CardItem>
        <Left>
          <Body>
            <Text>{club.name}</Text>
            <Text note>{club.winery}</Text>
          </Body>
        </Left>
        <Right>
          <Body>
            <Text>Tastings</Text>
          </Body>
        </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Button
            testID="more-btn"
            style={styles.moreBtn} 
            onPress={() => navigation.navigate('Club', { club })}>
            <Text>More</Text>
          </Button>
        </Left>
        <Right>
          <Body>
            <Text>{club.tastings}</Text>
          </Body>
        </Right>
      </CardItem>
    </Card>
  )
}

const styles = StyleSheet.create({
  clubCard: {
    // flex: 1,
    width: '100%',
    paddingHorizontal: wp('7%')
  },
  moreBtn: {
    backgroundColor: '#620014'
  }
})