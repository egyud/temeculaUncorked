import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWineClubs } from '../actions/wineActions'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Button, Spinner } from 'native-base'
import ClubColumn from '../components/ClubColumn'
import ClubModal from '../components/ClubModal'

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
    createTableDataArray()
  }, [wineClubs])

  function createTableDataArray() {
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
        </View>
        <View style={styles.clubSelectionBtnWrapper}>
          <Button
            testID="open-modal-1"
            style={styles.clubSelectionBtn}
            onPress={() => {
              updateSelectedClubNumber(1)
              updateModalVisible(true)
            }}>
            <Text style={styles.selectBtnText}>Pick a club to compare</Text>
          </Button>
          <Button
            style={styles.clubSelectionBtn}
            onPress={() => {
              updateSelectedClubNumber(2)
              updateModalVisible(true)
            }}>
            <Text style={styles.selectBtnText}>Pick a 2nd club to compare</Text>
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
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    // padding: 10, 
    // paddingTop: 30, 
    // backgroundColor: '#e6ffe6'
    // backgroundColor: '#f5f5f5'
  },
  head: {  
    height: 40,  
    backgroundColor: '#99ff99'  
  },
  wrapper: { 
    flexDirection: 'row' 
  },
  row: {  
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#e6ffe6'
  },
  picker: {
    marginVertical: 0,
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
    backgroundColor: '#614d36',
    paddingVertical: 15,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 30,
    borderColor: '#99ff99',
    borderWidth: 5,
    justifyContent: 'center',
    marginTop: 10
  },
  compareLinkText: {
    fontWeight: 'bold',
    color: '#e6ffe6',
  },
  clubSelectionBtn: {
    backgroundColor: '#614d36',
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 25,
    borderColor: '#99ff99',
    borderWidth: 5,
    paddingVertical: 20,
    borderRadius: 20
  },
  clubSelectionBtnWrapper: {
    flexDirection: 'row',
    marginVertical: 30,
    // width: '50%'
  },
  selectBtnText: {
    color: '#fff',
    fontWeight: 'bold',
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