import React from 'react'
import { StyleSheet } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'

export default ReviewList = () => {
  return (
    <List>
      <ListItem avatar>
        <Left>
          <Thumbnail/>
        </Left>
        <Body>
          <Text>Samwise B.</Text>
          <Text note>Reviewed Doffo Winery</Text>
        </Body>
        <Right>
          <Text note>3:43pm</Text>
        </Right>
      </ListItem>
      <ListItem avatar>
        <Left>
          <Thumbnail/>
        </Left>
        <Body>
          <Text>Amy R</Text>
          <Text note>Reviewed Leoness Cellars</Text>
        </Body>
        <Right>
          <Text note>2:22pm</Text>
        </Right>
      </ListItem>
      <ListItem avatar>
        <Left>
          <Thumbnail/>
        </Left>
        <Body>
          <Text>Lester</Text>
          <Text note>Reviewed Wiens Family Cellars</Text>
        </Body>
        <Right>
          <Text note>12:30pm</Text>
        </Right>
      </ListItem>
      <ListItem avatar>
        <Left>
          <Thumbnail/>
        </Left>
        <Body>
          <Text>Andy E</Text>
          <Text note>Reviewed Akash Winery</Text>
        </Body>
        <Right>
          <Text note>12:28pm</Text>
        </Right>
      </ListItem>
      <ListItem avatar>
        <Left>
          <Thumbnail/>
        </Left>
        <Body>
          <Text>Joe G.</Text>
          <Text note>Reviewed Lorimar Something</Text>
        </Body>
        <Right>
          <Text note>Yesterday</Text>
        </Right>
      </ListItem>
    </List>
  )
}

const styles = StyleSheet.create({

})