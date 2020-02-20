import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWineClubs } from '../actions/wineActions'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'
import { Form, Picker } from 'native-base'
import ClubColumn from '../components/ClubColumn'

const ClubComparison = ({ wineClubs, fetchWineClubs, navigation }) => {
  const [clubList, updateClubList] = useState([])
  const [firstClub, updateFirstClub] = useState('')
  const [secondClub, updateSecondClub] = useState('')

  useEffect(() => {
    fetchWineClubs()
  }, [])

  useEffect(() => {
    createTableDataArray()
  }, [wineClubs])

  function createTableDataArray() {
    let tableDataArray = []
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
            <View>
              <Text
                onPress={() => navigation.navigate('Club List')} 
                style={styles.compareLink}>Click here to view a complete list of wine clubs</Text>
            </View>
         
          <Form style={styles.form}>
            <Text>Pick a club for comparison</Text>
            <Picker
              note
              mode="dropdown"
              selectedValue={clubList[0]}
              onValueChange={(value) => changeClubValue(value, 1)}
              style={styles.picker}
              >
              {clubList.map(club => (
                <Picker.Item label={club.name} value={club.name}/>
              ))}
            </Picker>
            <Text>Pick a second club for comparison</Text>
            <Picker
              note
              mode="dropdown"
              selectedValue={clubList[1]}
              onValueChange={(value) => changeClubValue(value, 2)}
              style={styles.picker}
              >
              {clubList.map(club => (
                <Picker.Item label={club.name} value={club.name}/>
              ))}
            </Picker>
          </Form>
          <View style={styles.columnWrapper}>
            <ClubColumn club={firstClub}/>
            <ClubColumn club={secondClub}/>
          </View>
        </View>
    )
  }
  return (
    <View>
      <Text>Loading...</Text>
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
    padding: 16, 
    paddingTop: 30, 
    // backgroundColor: 'blue'
  },
  form: {
    // flex: 1
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
  text: { 
    textAlign: 'center',
    marginBottom: 0,
    backgroundColor: '#fff',
    padding: 20
  },
  table: {
    width: '100%'
  },
  picker: {
    marginVertical: 0,
  },
  rowText: {
    // fontSize: 20,
    textAlign: 'center',
    // paddingLeft: 10
  },
  rowHead: {
    textAlign: 'center',
    borderWidth: 0
  },
  columnWrapper: {
    flex: 2,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-around',
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

export default connect(mapStateToProps, mapDispatchToProps)(ClubComparison)