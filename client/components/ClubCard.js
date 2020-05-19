import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, CardItem, Text, Button, Left, Right, Body } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default ClubCard = ({ club, navigation }) => {
  
  return (
    <Card style={styles.clubCard} testID="club-card">
      <CardItem>
        <Left>
          <Body>
            <Text style={styles.text}>{club.name}</Text>
            <Text style={styles.text} note>{club.winery}</Text>
          </Body>
        </Left>
        <Right>
          <Body>
            <Text style={styles.text}>Tastings</Text>
          </Body>
        </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Button
            testID="more-btn"
            style={styles.moreBtn} 
            onPress={() => navigation.navigate('Club', { club })}>
            <Text style={styles.text}>More</Text>
          </Button>
        </Left>
        <Right>
          <Body>
            <Text style={styles.text}>{club.tastings}</Text>
          </Body>
        </Right>
      </CardItem>
    </Card>
  )
}

const styles = StyleSheet.create({
  clubCard: {
    width: '100%',
  },
  moreBtn: {
    backgroundColor: '#620014'
  },
  text: {
    fontSize: hp('1.6%')
  }
})