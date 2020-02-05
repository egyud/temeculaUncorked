import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { View, StyleSheet, Image } from 'react-native'
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, List, ListItem } from 'native-base'
import { Rating } from 'react-native-ratings'

const WineScreen = ({ navigation, user, isAuthenticated }) => {
  const [wineRating, updateWineRating] = useState(0)
  const [recentRatings, updateRecentRatings] = useState([])
  const wine = navigation.getParam('wine')
  const { name, rating, winery, ratingCount, price, clubPrice, _id: wineId, description } = wine

  useEffect(() => {
    getRecentRatings()
  }, [])

  useEffect(() => {
    postRating()
  }, [wineRating])

  function postRating() {
    if (isAuthenticated && wineRating > 0) {
      axios.post('http://localhost:5000/api/ratings', {
        userId: user._id,
        wineId,
        rating: wineRating 
      })
        .then(res => console.log(res.data))
        .catch(err => console.error(err))
    }
  }

  function getRecentRatings() {
    axios.get(`http://localhost:5000/api/ratings/recent/${wineId}`)
      .then(res => updateRecentRatings(res.data.ratings))
      .catch(err => console.error(err))
  }

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
                <Text>{price}</Text>
                <Text>Members price {clubPrice}</Text>
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
              <Rating 
                startingValue={rating}
                readonly={!isAuthenticated}
                onFinishRating={(rate) => updateWineRating(rate)}/>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Next level aesthetic tbh, polaroid beard 8-bit YOLO. Artisan tumblr copper mug craft beer hashtag everyday carry iPhone you probably haven't heard of them vegan normcore ugh. Umami roof party williamsburg trust fund stumptown yr, godard swag.</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              
            </Left>
            <Right>
              <Button style={styles.button}>
                <Text>Photos</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
        <Text>Recent Ratings</Text>
        <List>
          {recentRatings.map(rate => (
            <ListItem>
              <Left>
                <Thumbnail source={{ uri: rate.userId.avatar.url }}/>
                <Text>{rate.userId.name}</Text>
              </Left>
              <Body>
                <Rating
                  readonly={true}
                  startingValue={rate.rating}
                  imageSize={25}/>
              </Body>
              <Right>
              </Right>
            </ListItem>
          ))}
        </List>
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
  button: {
    backgroundColor: '#89012c'
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user.user,
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(WineScreen)