import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { View, StyleSheet, Image } from 'react-native'
import { Content, Card, CardItem, Text, Button, Icon, Left, Right, Body, Tab, Tabs } from 'native-base'
import CommentList from '../components/CommentList'

const EventPage = ({ navigation, activeUser, isAuthenticated }) => {
  const [comments, updateComments] = useState([])
  const event = navigation.getParam('event')
  const { title, winery, date, time, price, attending, whoCanAttend, description, address, _id } = event

  useEffect(() => {
    getComments()
  }, [event])

  function getComments() {
    axios.get(`http://localhost:5000/api/comments/event/${_id}`)
      .then(res => {
        updateComments(res.data.comments)
        console.log(res.data.comments)
      })
      .catch(err => console.error(err))
  }

  let postCommentBtn = (
    <Button
      style={styles.btnText}
      onPress={() => navigation.navigate('NewComment', { event, activeUser, type: 'event' })}>
      <Icon
        type="FontAwesome"
        name='plus' />
      <Text style={styles.btnText}>Add a new comment</Text>
    </Button>
  )

  if (!isAuthenticated) {
    postCommentBtn = null
  }

  return (
    <Content>
      <View>
        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text style={styles.title}>{title}</Text>
                <Text note>{winery}</Text>
              </Body>
            </Left>
            <Right>
              <Body>
                <Text>{date}</Text>
                <Text note>{time}</Text>
              </Body>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Image 
                source={require('../assets/events.jpg')}
                style={styles.image}/>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Text note>{address}</Text>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{description}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button 
                style={styles.button}
              >
                <Text>Attend</Text>
              </Button>
              <Text>{attending.length} people are going</Text>
            </Left>
            <Right>
              <Button style={styles.button}>
                <Text>Photos</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
        <Tabs
          style={styles.tabs}
          tabBarUnderlineStyle={{backgroundColor: '#89012c'}}>
          <Tab
            heading="Discussion"
            activeTextStyle={{color: '#89012c'}}>
            {postCommentBtn}
            <CommentList comments={comments}/>
          </Tab>
          <Tab
            heading="More Details"
            activeTextStyle={{color: '#89012c'}}>
            <Text>Hello world</Text>
          </Tab>
        </Tabs>
      </View>
    </Content>
  )
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
  location: {
    fontSize: 14
  },
  button: {
    backgroundColor: '#89012c'
  }
})

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    activeUser: state.authReducer.user.user
  }
}

export default connect(mapStateToProps)(EventPage)