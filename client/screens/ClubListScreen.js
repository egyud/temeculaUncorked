import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWineClubs } from '../actions/wineActions'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import ClubList from '../components/ClubList'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export const ClubListScreen = ({ wineClubs, fetchWineClubs, navigation }) => {
  const [clubsList, updateClubsList] = useState([])

  useEffect(() => {
    fetchWineClubs()
  }, [])

  useEffect(() => {
    convertClubData()
  }, [wineClubs])

  // this function just makes it easier to use the club data
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
      <View>
        <Text
          testID="compare-link"
          onPress={() => navigation.navigate('Comparison')} 
          style={styles.compareLink}>Compare wine club benefits</Text>
      </View>
      <ScrollView>
        <ClubList 
          clubs={clubsList}
          navigation={navigation}/>
      </ScrollView>
    </View>
  )
}

ClubListScreen.navigationOptions = {
  title: 'Wine Clubs',
  headerStyle: {
    backgroundColor: '#fcf1d2'
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
    backgroundColor: '#620014',
    paddingVertical: 25,
    paddingHorizontal: 40
  },
  compareLink: {
    textAlign: 'center',
    backgroundColor: '#fcf1d2',
    paddingVertical: 15,
    color: '#620014',
    fontWeight: 'bold',
    fontSize: hp('1.6%'),
    width: wp('80%'),
    alignSelf: 'center',
    borderColor: '#620014',
    borderWidth: 3,
    marginVertical: hp('1%'),
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