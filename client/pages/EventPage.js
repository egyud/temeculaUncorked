import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Share, View, StyleSheet, Image } from 'react-native'
import { Content, Card, CardItem, Text, Button, Icon, Left, Right, Body, Tab, Tabs, ListItem } from 'native-base'
import { showMessage, hideMessage } from 'react-native-flash-message'
import CommentList from '../components/CommentList'

const EventPage = ({ navigation, activeUser, isAuthenticated }) => {
  const [comments, updateComments] = useState([])
  const event = navigation.getParam('event')
  const { title, winery, date, time, price, attending, membersOnly, adultsOnly, description, address, _id } = event

  useEffect(() => {
    getComments()
  }, [event])

  function attendEvent() {
    axios.post('http://localhost:5000/api/events/attend', {
      userId: activeUser._id,
      eventId: _id
    })
      .then(res => {
        showMessage({
          message: res.data.message,
          type: 'success'
        })
      })
      .catch(err => {
        showMessage({
          message: err.response.data.message,
          type: 'danger'
        })
      })
  }

  async function shareEvent() {
    try {
      const result = await Share.share({
        message: `${title} - ${description}`,
        title: `Check out this event from Temecula Uncorked`
      })

      if (result.action === Share.sharedAction) {
        alert('Post Shared')
      } else if (result.action === Share.dismissedAction) {
        alert('Post cancelled')
      }
    } catch (error) {
      alert(error.message)
    }
  }

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
      style={styles.postCommentBtn}
      onPress={() => navigation.navigate('NewComment', { event, activeUser, type: 'event' })}>
      <Icon
        type="FontAwesome"
        name='plus' />
      <Text style={styles.postCommentBtnText}>Add a new comment</Text>
    </Button>
  )

  let attendShareBtns = (
    <>
      <Left>
        <Button 
          style={styles.button}
          onPress={() => attendEvent()}
        >
          <Text>Attend</Text>
        </Button>
      </Left>
      <Body>
        <Button 
          style={styles.button}
          onPress={() => shareEvent()}>
          <Text>Share</Text>
        </Button>
      </Body>
    </>
  )

  if (!isAuthenticated) {
    postCommentBtn = null
    attendShareBtns = null
  }

  let membersOnlyText, adultsOnlyText
  if (membersOnly) {
    membersOnlyText = 'Members Only'
  } else {
    membersOnlyText = 'Open to the public'
  }

  if (adultsOnly) {
    adultsOnlyText = '21 and over'
  } else {
    adultsOnlyText = 'All ages welcome'
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
            {attendShareBtns}
            <Right>
              <Button style={styles.button}>
                <Text>Photos</Text>
              </Button>
            </Right>
          </CardItem>
          <CardItem>
            <Left>
              <Text>{attending.length} people are going</Text>
            </Left>
          </CardItem>
        </Card>
        <Tabs
          style={styles.tabs}
          tabBarUnderlineStyle={{backgroundColor: '#89012c'}}>
          <Tab
            heading="Comments"
            activeTextStyle={{color: '#89012c'}}>
            {postCommentBtn}
            <CommentList comments={comments}/>
          </Tab>
          <Tab
            heading="More Details"
            activeTextStyle={{color: '#89012c'}}>
            <ListItem>
              <Text>Price: {price}</Text>
            </ListItem>
            <ListItem>
              <Text>{adultsOnlyText}</Text>
            </ListItem>
            <ListItem>
              <Text>{membersOnlyText}</Text>
            </ListItem>
          </Tab>
        </Tabs>
      </View>
    </Content>
  )
}

EventPage.navigationOptions = {
  title: 'Event Info',
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
  location: {
    fontSize: 14
  },
  button: {
    backgroundColor: '#89012c'
  },
  postCommentBtn: {
    backgroundColor: '#614d36',
    justifyContent: 'center',
  },
  postCommentBtnText: {
    textAlign: 'center',
  }
})

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    activeUser: state.authReducer.user.user
  }
}

export default connect(mapStateToProps)(EventPage)