import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWineList } from '../../actions/wineActions'
import { View, StyleSheet, Text } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
import { Form, Picker } from 'native-base'
import WineList from '../../components/WineList'

const WineSearch = ({ wineArray, fetchWineList }) => {
  const [sortBy, updateSortBy] = useState('name')
  const [filterBy, updateFilterBy] = useState('')
  const [wineList, updateWineList] = useState([])

  useEffect(() => {
    fetchWineList()
  }, [])

  useEffect(() => {
    updateWineList(wineArray)
  }, [wineArray])

  useEffect(() => {
    console.log('wineList')
    console.log(wineList)
    sortWines()
  }, [sortBy])


  function sortWines() {
    let sortedList = wineList.sort((a,b) => a.rating - b.rating )
    console.log(sortedList)
    updateWineList(sortedList)
  }


  return (
    <View>
      <View>
        <Form>
          <Text>Sort By</Text>
          <Picker
            mode="dropdown"
            selectedValue={sortBy}
            onValueChange={(value) => updateSortBy(value)}>
            <Picker.Item label="winery" value="winery"/>
            <Picker.Item label="name" value="name"/>
            <Picker.Item label="type" value="category"/>
            <Picker.Item label="rating" value="rating"/>
          </Picker>
        </Form>
      </View>
      <WineList wines={wineArray}/>
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

const mapStateToProps = (state) => {
  return {
    wineArray: state.wineReducer.wineList
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchWineList
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WineSearch)