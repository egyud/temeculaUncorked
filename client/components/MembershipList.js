import React from 'react'
import { Container, Header, Content, ListItem, CheckBox, Text, Body } from 'native-base'

export default MembershipList = ({ wineryList, memberships }) => {
  
  // convert the memberships array into an array of just the winery names for easier comparison
  const membershipArr = memberships.map(winery => winery.name)

  return (
    <Content>
      {wineryList.map(winery => (
        <ListItem>
          <CheckBox checked={membershipArr.includes(winery.name)}/>
          <Body>
            <Text>{winery.name}</Text>
          </Body>
        </ListItem>
      ))}
    </Content>
  )
}