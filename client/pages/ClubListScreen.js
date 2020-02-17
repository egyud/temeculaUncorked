import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWineClubs } from '../actions/wineActions'
import { View, StyleSheet, Text, Modal } from 'react-native'
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
    <View style={styles.container}>
      <ClubList 
        clubs={clubsList}
        navigation={navigation}/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
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