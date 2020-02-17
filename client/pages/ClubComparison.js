import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWineClubs } from '../actions/wineActions'
import { View, StyleSheet, Text } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
import { Form, Picker } from 'native-base'


const ClubComparison = ({ wineClubs, fetchWineClubs }) => {
  const [tableHead, updateTableHead]  = useState(['Winery', 'Club', 'Free Tastings'])
  const [tableData, updateTableData] = useState([])
  const [selectedColumn, updateSelectedColumn] = useState('Free Tastings')

  console.log(wineClubs)

  useEffect(() => {
    fetchWineClubs()
  }, [])

  useEffect(() => {
    createTableDataArray()
  }, [wineClubs, selectedColumn])

  function createTableDataArray() {
    let tableDataArray = []
    wineClubs.forEach(winery => {
      let { wineClubs: clubs } = winery
      clubs.forEach(club => {
        let rowArray = [winery.name, club.name]
        switch(selectedColumn) {
          case 'Free Tastings':
            rowArray.push(club.tastings)
            updateTableHead(['Winery', 'Club', 'Free Tastings'])
            break;
          case 'Pickups':
            rowArray.push(club.shipments)
            updateTableHead(['Winery', 'Club', 'Pickups'])
            break;
          case 'Discounts':
            rowArray.push(club.discounts)
            updateTableHead(['Winery', 'Club', 'Discounts'])
            break;
          case 'Other Benefits':
            rowArray.push(club.otherBenefits)
            updateTableHead(['Winery', 'Club', 'Other Benefits'])
            break;
          case 'Avg. Cost':
            rowArray.push(club.avgPrice)
            updateTableHead(['Winery', 'Club', 'Avg. Cost'])
            break;
          default:
            rowArray.push(club.tastings)
            updateTableHead(['Winery', 'Club', 'Free Tastings'])
            break;
        }
        tableDataArray.push(rowArray)
      })
    })
    updateTableData(tableDataArray)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Which category do you want to compare?</Text>
      <Text>Let's see if this is visible</Text>
      <Form>
        <Picker
          note
          mode="dropdown"
          selectedValue={selectedColumn}
          onValueChange={(value) => updateSelectedColumn(value)}
          style={styles.picker}
        >
          <Picker.Item label="Free Tastings" value="Free Tastings" />
          <Picker.Item label="Pickups" value="Pickups" />
          <Picker.Item label="Discounts" value="Discounts" />
          <Picker.Item label="Other Benefits" value="Other Benefits" />
          <Picker.Item label="Avg. Cost" value="Avg. Cost" />
        </Picker>
      </Form>
      <Table 
        borderStyle={{borderWidth: 0, borderColor: '#d2d2d2'}}
        style={styles.table}>
        <Row 
          data={tableHead} 
          style={styles.head}
          textStyle={styles.rowHead}
        />
        <Rows 
          data={tableData} 
          style={styles.row}
          textStyle={styles.rowText}
        />
      </Table>
      
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
    backgroundColor: '#fff'
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