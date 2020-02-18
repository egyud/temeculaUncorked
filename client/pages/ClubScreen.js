import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { View, StyleSheet, Image } from 'react-native'
import { Content, Card, CardItem, Text, Button, Icon, Left, Right, Body, Tab, Tabs, ListItem } from 'native-base'

const ClubScreen = ({ navigation }) => {
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
                <Text note>{winery}</Text>
              </Body>
            </Left>
            <Right>
              <Body>
                <Text>{avgPrice}</Text>
                <Text note>Avg. Cost</Text>
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
              <Text>Free Tastings</Text>
              <Text>{tastings}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Shipments/Pickups</Text>
              <Text>{shipments}</Text>
            </Body>
          </CardItem>
        </Card>
        <Tabs
          style={styles.tabs}
          tabBarUnderlineStyle={{backgroundColor: '#89012c'}}>
          <Tab
            heading="Discounts"
            activeTextStyle={{color: '#89012c'}}>
            {discounts.map(discount => (
              <ListItem key={discount}>
                <Text>{discount}</Text>
              </ListItem>
            ))}
          </Tab>
          <Tab
            heading="Other Benefits"
            activeTextStyle={{color: '#89012c'}}>
            {otherBenefits.map(benefit => (
              <ListItem key={benefit}>
                <Text>{benefit}</Text>
              </ListItem>
            ))}
          </Tab>
        </Tabs>
      </View>
    </Content>
  )
}

ClubScreen.navigationOptions = {
  title: 'Club Info',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: '100%',
    // flex: 1
  },
  title: {
    fontSize: 25
  },
  button: {
    backgroundColor: '#89012c'
  }
})

export default connect()(ClubScreen)