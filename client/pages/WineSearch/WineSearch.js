import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
import { Form, Picker } from 'native-base'
import { wineList } from '../../fakeData/wineList'

export default WineSearch = () => {
  const [tableHead, updateTableHead]  = useState(['Winery', 'Wine', 'Rating'])
  const [tableData, updateTableData] = useState([])
  const [selectedColumn, updateSelectedColumn] = useState('Rating')

  useEffect(() => {
    createTableDataArray()
  }, [selectedColumn])

  function createTableDataArray() {
    let tableDataArray = []
    wineList.forEach(wine => {
      let rowArray = [wine.winery, wine.name]
      switch(selectedColumn) {
        case 'Rating':
          rowArray.push(wine.rating)
          updateTableHead(['Winery', 'Wine', 'Rating'])
          break;
        case 'Price':
          rowArray.push(wine.price)
          updateTableHead(['Winery', 'Wine', 'Price'])
          break;
        case 'Type':
          rowArray.push(wine.type)
          updateTableHead(['Winery', 'Wine', 'Type'])
          break;
        default:
          rowArray.push(wine.rating)
          updateTableHead(['Winery', 'Wine', 'Rating'])
          break;
      }
      tableDataArray.push(rowArray)
    })
    updateTableData(tableDataArray)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select which data to view</Text>
      <Form>
        <Picker
          note
          mode="dropdown"
          selectedValue={selectedColumn}
          onValueChange={(value) => updateSelectedColumn(value)}
          style={styles.picker}
        >
          <Picker.Item label="Rating" value="Rating" />
          <Picker.Item label="Price" value="Price" />
          <Picker.Item label="Type" value="Type" />
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

WineSearch.navigationOptions = {
  title: 'Wines',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
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