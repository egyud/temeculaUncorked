import React from 'react'
import { List, ListItem, Text } from 'native-base'

export default SideBar = () => {
  return (
    <List>
      <ListItem>
        <Text>Home</Text>
      </ListItem>
      <ListItem>
        <Text>Winery List</Text>
      </ListItem>
      <ListItem>
        <Text>Compare Wine Clubs</Text>
      </ListItem>
      <ListItem>
        <Text>Events</Text>
      </ListItem>
      <ListItem>
        <Text>Wines</Text>
      </ListItem>
      <ListItem>
        <Text>Login</Text>
      </ListItem>
      <ListItem>
        <Text>Register</Text>
      </ListItem>
    </List>
  )
}