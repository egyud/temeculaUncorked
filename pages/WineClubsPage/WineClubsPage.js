import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Picker, Text } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import { clubData } from '../../clubData'

export default WineClubsPage = () => {
  const [tableHead, updateTableHead]  = useState(['Winery', 'Club', 'Free Tastings'])
  const [tableData, updateTableData] = useState([])
  const [selectedColumn, updateSelectedColumn] = useState('Free Tastings')

  useEffect(() => {
    createTableDataArray()
  }, [selectedColumn])

  function createTableDataArray() {
    let tableDataArray = []
    clubData.forEach(winery => {
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
      <Picker
        selectedValue={selectedColumn}
        onValueChange={(value) => updateSelectedColumn(value)}
      >
        <Picker.Item label="Free Tastings" value="Free Tastings" />
        <Picker.Item label="Pickups" value="Pickups" />
        <Picker.Item label="Discounts" value="Discounts" />
        <Picker.Item label="Other Benefits" value="Other Benefits" />
        <Picker.Item label="Avg. Cost" value="Avg. Cost" />
      </Picker>
      <Table borderStyle={{borderWidth: 1}}>
        <Row data={tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} />
         <Rows data={tableData} style={styles.row}/>
      </Table>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
})