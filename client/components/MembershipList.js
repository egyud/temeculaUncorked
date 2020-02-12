import React from 'react'
import { Container, Header, Content, ListItem, CheckBox, Text, Body } from 'native-base'

export default MembershipList = ({ wineryList }) => {
  return (
    <Content>
      {wineryList.map(winery => (
        <ListItem>
          <CheckBox />
          <Body>
            <Text>{winery.name}</Text>
          </Body>
        </ListItem>
      ))}
    </Content>
  )
}