import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Image } from 'react-native'
import { Content, Card, CardItem, Text, Button, Icon, Left, Right, Body, Tab, Tabs, ListItem } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export const ClubScreen = ({ navigation }) => {
  const club = navigation.getParam('club')
  const { name, winery, discounts, otherBenefits, tastings, shipments, avgPrice } = club

  return (
    <Content>
      <View>
        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.text} note>{winery}</Text>
              </Body>
            </Left>
            <Right>
              <Body>
                <Text style={styles.text}>{avgPrice}</Text>
                <Text style={styles.text} note>Avg. Cost</Text>
              </Body>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Image 
                source={require('../assets/wineGlasses.jpg')}
                style={styles.image}/>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.text}>Free Tastings</Text>
              <Text style={styles.text}>{tastings}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.text}>Shipments/Pickups</Text>
              <Text style={styles.text}>{shipments}</Text>
            </Body>
          </CardItem>
        </Card>
        <Tabs
          style={styles.tabs}
          tabBarUnderlineStyle={{backgroundColor: '#620014'}}>
          <Tab
            heading="Discounts"
            activeTextStyle={{color: '#620014'}}>
            {discounts.map(discount => (
              <ListItem key={discount}>
                <Text style={styles.text}>{discount}</Text>
              </ListItem>
            ))}
          </Tab>
          <Tab
            heading="Other Benefits"
            activeTextStyle={{color: '#89012c'}}>
            {otherBenefits.map(benefit => (
              <ListItem key={benefit}>
                <Text style={styles.text}>{benefit}</Text>
              </ListItem>
            ))}
          </Tab>
        </Tabs>
      </View>
    </Content>
  )
}

ClubScreen.navigationOptions = {
  title: '',
  headerStyle: {
    backgroundColor: '#fcf1d2'
  }
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: '100%',
  },
  title: {
    fontSize: hp('2.7%')
  },
  button: {
    backgroundColor: '#620014'
  },
  text: {
    fontSize: hp('1.6%')
  }
})

export default connect()(ClubScreen)