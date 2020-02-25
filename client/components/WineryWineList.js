import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Modal, ScrollView } from 'react-native'
import { Form, Picker, Button } from 'native-base'
import WineList from './WineList'
import FilterModal from './FilterModal'

export default WineryWineList = ({ wineArray, navigation }) => {
  const [sortBy, updateSortBy] = useState('ratingD')
  const [filters, updateFilters] = useState([])
  const [wineList, updateWineList] = useState([])
  const [modalVisible, updateModalVisible] = useState(false)

  useEffect(() => {
    updateWineList(wineArray)
  }, [wineArray])

  useEffect(() => {
    if (wineList.length > 0) {
      sortWines()
    }
  }, [sortBy])

  function sortWines() {
    let wineArr = [...wineList]
    switch (sortBy) {
      case 'ratingA':
        wineArr.sort((a,b) => a.rating - b.rating)
        break
      case 'ratingD':
        wineArr.sort((a,b) => b.rating - a.rating)
        break
      case 'numRatingA':
        wineArr.sort((a,b) => a.ratingCount - b.ratingCount)
        break
      case 'numRatingD':
        wineArr.sort((a,b) => b.ratingCount - a.ratingCount)
        break
      case 'priceA':
        wineArr.sort((a,b) => Number(a.price.substring(1)) - Number(b.price.substring(1)))
        break
      case 'priceD':
        wineArr.sort((a,b) => Number(b.price.substring(1)) - Number(a.price.substring(1)))
        break
      default:
        wineArr.sort((a,b) => b.rating - a.rating)
    }
    updateWineList(wineArr)
  }

  function addToFilters(value) {
    updateFilters([...filters, value])
  }

  function filterWines() {
    if (filters.length === 0) {
      updateWineList(wineArray)
    } else {   
      let filteredWines = wineArray.filter(wine => {
        return filters.includes(wine.category) || filters.includes(wine.winery)
      })
      updateWineList(filteredWines)
      updateModalVisible(false)
    }
  }

  return (
    <View>
      <View>
        <FilterModal 
          close={() => updateModalVisible(false)}
          filterWines={() => filterWines()}
          addToFilters={addToFilters}
          isWineryScreen={true}
          modalVisible={modalVisible}
        />
        <Button
            style={styles.filterBtn} 
            onPress={() => {
              updateModalVisible(true)
              updateFilters([])
            }}>
            <Text>Filter Wine List</Text>
          </Button>
          <Form>
            <Text>Sort By</Text>
            <Picker
              mode="dropdown"
              selectedValue={sortBy}
              onValueChange={(value) => updateSortBy(value)}>
              <Picker.Item label="rating asc" value="ratingA"/>
              <Picker.Item label="rating desc" value="ratingD"/>
              <Picker.Item label="# of ratings asc" value="numRatingA"/>
              <Picker.Item label="# of ratings desc" value="numRatingD"/>
              <Picker.Item label="price asc" value="priceA"/>
              <Picker.Item label="price desc" value="priceD"/>
            </Picker>
          </Form>
      </View>
      <WineList 
        wines={wineList}
        navigation={navigation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  
    height: 40,  
    backgroundColor: '#99ff99'  
  },
  text: { 
    textAlign: 'center',
    marginBottom: 0
  },
  picker: {
    marginVertical: 0,
  },
  filterBtn: {
    backgroundColor: '#99ff99',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 25,
    borderColor: '#614d36',
    borderWidth: 1
  },
  modalBtnWrapper: {
    flexDirection: 'row',
    width: '100%'
  },
  modalBtn: {
    backgroundColor: '#99ff99',
    flex: 1,
    justifyContent: 'center',
    borderColor: '#614d36',
    borderWidth: 1
  }
})