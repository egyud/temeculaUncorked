import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWineClubs } from '../actions/wineActions'
import { View, StyleSheet, Text } from 'react-native'
import { Button, Spinner } from 'native-base'
import ClubColumn from '../components/ClubColumn'
import ClubModal from '../components/ClubModal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export const ClubComparison = ({ wineClubs, fetchWineClubs, navigation }) => {
  const [clubList, updateClubList] = useState([])
  const [firstClub, updateFirstClub] = useState('')
  const [secondClub, updateSecondClub] = useState('')
  const [modalVisible, updateModalVisible] = useState(false)
  const [selectedClubNumber, updateSelectedClubNumber] = useState(null)

  useEffect(() => {
    fetchWineClubs()
  }, [])

  useEffect(() => {
    createClubDataArray()
  }, [wineClubs])

  // this function just makes it easier to use the club data
  function createClubDataArray() {
    let clubListArray = []
    wineClubs.forEach(winery => {
      let { wineClubs: clubs } = winery
      clubs.forEach(club => {
        clubListArray.push({
          ...club,
          winery: winery.name
        })
      })
    })
    updateClubList(clubListArray)
    updateFirstClub(clubListArray[0])
    updateSecondClub(clubListArray[1])
  }

  function changeClubValue(name, number) {
    let index = clubList.findIndex(club => club.name === name)
    if (number === 1) {
      updateFirstClub(clubList[index])
    } else {
      updateSecondClub(clubList[index])
    }
  }

  if (clubList.length > 0) {
    return (
      <View style={styles.container}>
        <ClubModal 
          removeClubNumber={() => updateSelectedClubNumber(null)}
          clubNumber={selectedClubNumber}
          close={() => updateModalVisible(false)}
          modalVisible={modalVisible}
          clubList={clubList}
          changeClubValue={changeClubValue}
        />
        <View>
          <Button
            testID="compare-link"
            onPress={() => navigation.navigate('ClubList')}
            style={styles.compareLink} 
          >
            <Text style={styles.compareLinkText}>View a complete list of wine clubs</Text>
          </Button>
          <View style={styles.explain}>
            <Text style={styles.explainText}>Use this page to compare any two wine clubs at a time.  The buttons below allow you to select which clubs you're comparing.</Text>
          </View>
        </View>
        <View style={styles.clubSelectionBtnWrapper}>
          <Button
            testID="open-modal-1"
            style={styles.clubSelectionBtn}
            onPress={() => {
              updateSelectedClubNumber(1)
              updateModalVisible(true)
            }}>
            <Text style={styles.selectBtnText}>Pick a club</Text>
          </Button>
          <Button
            style={styles.clubSelectionBtn}
            onPress={() => {
              updateSelectedClubNumber(2)
              updateModalVisible(true)
            }}>
            <Text style={styles.selectBtnText}>Pick a 2nd club</Text>
          </Button>
        </View>
        <View style={styles.columnWrapper}>
          <ClubColumn club={firstClub}/>
          <ClubColumn club={secondClub}/>
        </View>
      </View>
    )
  }
  return (
    <View>
      <Spinner testID="spinner"/>
    </View>
  )

}

ClubComparison.navigationOptions = {
  title: 'Compare Wine Clubs',
  headerStyle: {
    backgroundColor: '#fcf1d2'
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  columnWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  imageBackground: {
    width: '100%', 
    paddingVertical: 20,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  compareLink: {
    textAlign: 'center',
    backgroundColor: '#620014',
    paddingVertical: 20,
    width: wp('80%'),
    alignSelf: 'center',
    borderRadius: 30,
    borderColor: '#fcf1d2',
    borderWidth: 2,
    justifyContent: 'center',
    marginTop: 10
  },
  compareLinkText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: hp('1.6%')
  },
  clubSelectionBtn: {
    backgroundColor: '#fcf1d2',
    borderColor: '#620014',
    width: wp('33%'),
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 25,
    borderWidth: 2,
    paddingVertical: 20,
    borderRadius: 20
  },
  clubSelectionBtnWrapper: {
    flexDirection: 'row',
    marginVertical: 30,
  },
  selectBtnText: {
    color: '#620014',
    fontWeight: 'bold',
    fontSize: hp('1.6%')
  },
  explain: {
    width: wp('75%'),
    alignSelf: 'center',
    marginTop: wp('3%')
  },
  explainText: {
    textAlign: 'center',
    fontSize: hp('1.6%')
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

export default connect(mapStateToProps, mapDispatchToProps)(ClubComparison)