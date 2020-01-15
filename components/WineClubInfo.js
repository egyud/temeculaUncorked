import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Form, Picker } from 'native-base'
import { Table, Row, Rows } from 'react-native-table-component'
import { clubData } from '../clubData'

export default WineClubInfo = () => {
  const [tableHead, updateTableHead]  = useState(['Club', 'Free Tastings'])
  const [tableData, updateTableData] = useState([])
  const [selectedColumn, updateSelectedColumn] = useState('Free Tastings')
 
  useEffect(() => {
    createTableDataArray()
  }, [selectedColumn])

  function createTableDataArray() {
    // start by filtering to only include specific winery.  won't keep this when real data is involved
    let winery = clubData.filter(w => w.name === 'Wiens Family Cellars')
    let tableDataArray = []
    let { wineClubs: clubs } = winery[0]
    clubs.forEach(club => {
      let rowArray = [club.name]
      switch(selectedColumn) {
        case 'Free Tastings':
          rowArray.push(club.tastings)
            updateTableHead(['Club', 'Free Tastings'])
          break;
        case 'Pickups':
          rowArray.push(club.shipments)
          updateTableHead(['Club', 'Pickups'])
          break;
        case 'Discounts':
          rowArray.push(club.discounts)
            updateTableHead(['Club', 'Discounts'])
           break;
        case 'Other Benefits':
          rowArray.push(club.otherBenefits)
          updateTableHead(['Club', 'Other Benefits'])
          break;
        case 'Avg. Cost':
          rowArray.push(club.avgPrice)
          updateTableHead(['Club', 'Avg. Cost'])
          break;
        default:
          rowArray.push(club.tastings)
          updateTableHead(['Club', 'Free Tastings'])
          break;
      }
      tableDataArray.push(rowArray)
     })
    updateTableData(tableDataArray)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select a category to view</Text>
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
        borderStyle={{borderWidth: 1}}
        style={styles.table}>
        <Row data={tableHead} style={styles.head} />
        <Rows data={tableData} style={styles.row}/>
      </Table>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  
    height: 40,  
    backgroundColor: '#99ff99'  
  },
  wrapper: { flexDirection: 'row' },
  row: {  height: 60  },
  text: { 
    textAlign: 'center',
    marginBottom: 0
  },
  table: {
    width: '100%'
  },
  picker: {
    marginVertical: 0,
  }
})