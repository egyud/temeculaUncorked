import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWineClubs } from '../actions/wineActions'
import { View, StyleSheet, ImageBackground, Text, Modal, ScrollView } from 'react-native'
import { Form, Picker, Button } from 'native-base'
import ClubList from '../components/ClubList'

const ClubListScreen = ({ wineClubs, fetchWineClubs, navigation }) => {
  const [clubsList, updateClubsList] = useState([])

  useEffect(() => {
    fetchWineClubs()
  }, [])

  useEffect(() => {
    convertClubData()
  }, [wineClubs])

  function convertClubData() {
    let tempClubArray = []
    wineClubs.forEach(winery => {
      let { wineClubs: clubs } = winery
      clubs.forEach(club => {
        let clubObj = {
          ...club,
          winery: winery.name
        }
        tempClubArray.push(clubObj)
      })
    })
    updateClubsList(tempClubArray)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <ImageBackground
            source={require('../assets/wineGlasses.jpg')}
            style={styles.imageBackground}
          >
            <Text style={styles.headline}>Wine Clubs</Text>
          </ImageBackground>
          <View>
            <Text
              onPress={() => navigation.navigate('Comparison')} 
              style={styles.compareLink}>Compare wine club benefits</Text>
          </View>
        </View>
        <ClubList 
          clubs={clubsList}
          navigation={navigation}/>
      </View>
    </ScrollView>
  )
}

ClubListScreen.navigationOptions = {
  title: 'Wine Clubs',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackground: {
    width: '100%', 
    paddingVertical: 40,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headline: {
    fontSize: 30,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#89012c',
    paddingVertical: 25,
    paddingHorizontal: 40
  },
  compareLink: {
    textAlign: 'center',
    backgroundColor: '#99ff99',
    paddingVertical: 15,
    color: '#614d36',
    fontWeight: '500'
  }
})

const mapStateToProps = (state) => {
  return {
    wineClubs: state.wineReducer.wineClubs
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchWineClubs
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ClubListScreen)