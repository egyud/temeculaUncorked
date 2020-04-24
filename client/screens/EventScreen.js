import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Share, View, StyleSheet, Image } from 'react-native'
import { Content, Card, CardItem, Text, Button, Icon, Left, Right, Body, Tab, Tabs, ListItem } from 'native-base'
import { showMessage, hideMessage } from 'react-native-flash-message'
import CommentList from '../components/CommentList'
import getComments from '../utils/getCommentsEvent'
import attendEvent from '../utils/attendEvent'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import * as Font from 'expo-font'

export const EventScreen = ({ navigation, activeUser, isAuthenticated }) => {
  const [comments, updateComments] = useState([])
  const event = navigation.getParam('event')
  const { title, winery, date, time, price, attending, membersOnly, adultsOnly, description, address, _id } = event

  // useEffect(async () => {
  //   await Font.loadAsync({
  //     'lemon-milk-light': require('../assets/fonts/LemonMilklight.otf')
  //   })
  // }, [])

  useEffect(() => {
    getComments(_id)
      .then(res => updateComments(res.data.comments))
      .catch(err => console.error(err))
  }, [event])

  function attendEventHandler() {
    attendEvent(activeUser._id, _id)
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

  // async function shareEvent() {
  //   try {
  //     const result = await Share.share({
  //       message: `${title} - ${description}`,
  //       title: `Check out this event from Temecula Uncorked`
  //     })

  //     if (result.action === Share.sharedAction) {
  //       alert('Post Shared')
  //     } else if (result.action === Share.dismissedAction) {
  //       alert('Post cancelled')
  //     }
  //   } catch (error) {
  //     alert(error.message)
  //   }
  // }

  let postCommentBtn = (
    <Button
      testID="post-comment-btn"
      style={styles.postCommentBtn}
      onPress={() => navigation.navigate('NewComment', { event, activeUser, type: 'event' })}>
      <Text style={styles.postCommentBtnText}>Add a new comment</Text>
    </Button>
  )

  let attendShareBtns = (
    <>
      <Left>
        <Button
          testID="attend-btn" 
          style={styles.postCommentBtn}
          onPress={() => attendEventHandler()}
        >
          <Text style={styles.postCommentBtnText}>Attend</Text>
        </Button>
      </Left>
      {/* <Body>
        <Button 
          style={styles.button}
          onPress={() => shareEvent()}>
          <Text>Share</Text>
        </Button>
      </Body> */}
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
          <CardItem style={styles.topCardItem}>
            <Left>
              <Body>
                <Text  style={styles.text}style={styles.title}>{title}</Text>
                <Text  style={styles.text}note>{winery}</Text>
              </Body>
            </Left>
            <Right>
              <Body>
                <Text style={styles.text}>{date}</Text>
                <Text style={styles.text}note>{time}</Text>
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
              <Text style={styles.text}note>{address}</Text>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.text}>{description}</Text>
            </Body>
          </CardItem>
          <CardItem>
            {attendShareBtns}
            <Right>
              {postCommentBtn}
            </Right>
          </CardItem>
          <CardItem>
            <Left>
              <Text style={styles.text}>{attending.length} people are going</Text>
            </Left>
          </CardItem>
        </Card>
        <Tabs
          style={styles.tabs}
          tabBarUnderlineStyle={{backgroundColor: '#620014'}}>
          <Tab
            heading="Comments"
            activeTextStyle={{color: '#620014'}}>
            <CommentList comments={comments}/>
          </Tab>
          <Tab
            heading="More Details"
            activeTextStyle={{color: '#620014'}}>
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

EventScreen.navigationOptions = {
  title: 'Event Info',
  headerStyle: {
    backgroundColor: '#fcf1d2'
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
    backgroundColor: '#620014'
  },
  postCommentBtn: {
    backgroundColor: '#fcf1d2',
    borderColor: '#620014',
    borderWidth: 3,
    justifyContent: 'center',
    width: wp('45%')
  },
  postCommentBtnText: {
    textAlign: 'center',
    fontSize: hp('1.6%'),
    color: '#620014',
    fontWeight: 'bold',
  },
  topCardItem: {
    marginVertical: hp('2%')
  },
  text: {
    // fontFamily: 'lemon-milk-light'
    fontSize: hp('1.6%')
  }
})

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    activeUser: state.authReducer.user.user
  }
}

export default connect(mapStateToProps)(EventScreen)