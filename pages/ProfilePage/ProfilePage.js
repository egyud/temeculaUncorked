import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import ReviewList from '../../components/ReviewList/ReviewList'
import user from '../../fakeData/user'

export default ProfilePage = () => {
  let { name, followers, joined, memberAt } = user
  return (
    <View>
      <View>
        <ImageBackground
          source={require('../../assets/wineGlasses.jpg')}
          style={styles.imageBackground}
        >
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('../../assets/me_sd copy.jpg')}/>
              </Left>
              <Body>
                <Text>{name}</Text>
                <Text note>{joined}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Member at {memberAt.length} wineries</Text>
              </Left>
              <Body>
                <Text>{followers} followers</Text>
              </Body>
              <Right>
                <Button>
                  <Text>Follow</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </ImageBackground>
      </View>
      <View>
        <View style={styles.reviewsHeader}>
          <Text>Winery Review History</Text>
        </View>
        <ReviewList />
        <View style={styles.reviewsHeader}>
          <Text>Wine Rating History</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%', 
    // paddingVertical: 40,
    height: 250,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  reviewsHeader: {
    borderBottomWidth: 1,
    backgroundColor: '#99ff99',
    textAlign: 'center',
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10
  }
})