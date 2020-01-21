import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { Tabs, Tab, List, ListItem, Right, Content } from 'native-base'
import { Rating } from 'react-native-ratings' 
import EventList from '../../components/EventList'
import WineClubInfo from '../../components/WineClubInfo'
import BlockHeader from '../../components/BlockHeader'
import WineList from '../../components/WineList'
import WineryInfo from '../../components/WineryInfo'

const WineryPage = ({ navigation }) => {
  const [wineryData, updateWineryData] = useState({})
  const [wineListData, updateWineListData] = useState([])
  const [eventsArray, updateEventsArray] = useState([])
  const [wineryImages, updateWineryImages] = useState([])

  useEffect(() => {
    console.log('look for this')
    console.log(navigation.getParam('winery'))
    getWineryData(navigation.getParam('winery'))
    getEventsData(navigation.getParam('winery'))
  }, [navigation])

  function getWineryData(selectedWinery) {
    axios.get(`http:localhost:5000/api/wineries/page/${selectedWinery}`)
      .then(res => {
        console.log(res.data.winery)
        updateWineryData(res.data.winery)
        updateWineListData(res.data.wines)
      })
  }

  function getEventsData(selectedWinery) {
    axios.get(`http:localhost:5000/api/events/winery/${selectedWinery}`)
      .then(res => {
        console.log(res.data)
        updateEventsArray(res.data.events)
      })
  }

  function calculateAverage(totalValue, reviewCount) {
    return Number((totalValue / reviewCount).toFixed(1)) || 0
  }

  return (
    <Content>
      <View>
        <View>
          <ImageBackground 
            source={require('../../assets/wineGlasses.jpg')}
            style={styles.imageBackground}>
            <BlockHeader data={wineryData} rating={calculateAverage(wineryData.avgRating, wineryData.reviewCount)}/>
          </ImageBackground>
        </View>
        <Tabs 
          style={styles.tabs}
          tabBarUnderlineStyle={{backgroundColor: '#89012c'}}>
          <Tab 
            heading="Wine List" 
            activeTextStyle={{color: '#89012c'}}
          >
            <WineList wines={wineListData}/>
          </Tab>
          <Tab 
            heading="Wine Clubs" 
            activeTextStyle={{color: '#89012c'}}
          >
            <WineClubInfo />
          </Tab>
          <Tab 
            heading="Events" 
            activeTextStyle={{color: '#89012c'}}
          >
            <EventList events={eventsArray}/>
          </Tab>
          <Tab 
            heading="Info" 
            activeTextStyle={{color: '#89012c'}}
          >
            <WineryInfo info={wineryData}/>
          </Tab>
        </Tabs>
      </View>
    </Content>
  )
}

WineryPage.navigationOptions = {
  title: 'Winery Name',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: 'white',
    width: '80%',
    alignItems: 'center',
    paddingVertical: 50
  },
  imageBackground: {
    width: '100%', 
    paddingVertical: 40,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabs: {
    backgroundColor: '#99ff99'
  }
})

const mapStateToProps = (state) => {
  // console.log(state.reviewReducer.reviews.data)
  return {
    reviews: state.reviewReducer.reviews.data,
    user: state.authReducer.user.user
  }
}

export default connect(mapStateToProps)(WineryPage)