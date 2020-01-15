import React from 'react'
import { StyleSheet } from 'react-native'
import { Header, Left, Right, Body, Button, Icon, Title } from 'native-base'
import { Link } from 'react-router-native'

export default HeaderBar = ({ title }) => {
  return (
    <Header style={styles.header}>
      <Left>
      <Button transparent>
        <Icon style={styles.burgerIcon} name='menu' />
      </Button>
      </Left>
      <Body>
        <Link to="/"><Title>{title}</Title></Link>
      </Body>
      <Right>
      </Right>
    </Header>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#99ff99'
  },
  burgerIcon: {
    color: '#663366'
  }
})