import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Modal, ScrollView } from 'react-native'
import { Form, Picker, Button } from 'native-base'
import WineList from './WineList'
import FilterModal from './FilterModal'
import SortModal from './SortModal'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default WineryWineList = ({ wineArray, navigation, user, isAuthenticated, wineryList }) => {
  const [sortBy, updateSortBy] = useState('ratingD')
  const [filters, updateFilters] = useState([])
  const [wineList, updateWineList] = useState([])
  const [modalVisible, updateModalVisible] = useState(false)
  const [sortModalVisible, updateSortModalVisible] = useState(false)

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
          wineryList={wineryList}
        />
        <SortModal 
          close={() => updateSortModalVisible(false)}
          modalVisible={sortModalVisible}
          sort={() => sortWines()}
          updateSortBy={updateSortBy}
        />
        <View style={styles.btnWrapper}>
          <Button
            testID="filter-btn"
            style={styles.filterBtn} 
            onPress={() => {
              updateModalVisible(true)
              updateFilters([])
            }}>
            <Text style={styles.filterBtnText}>Filter Wine List</Text>
          </Button>
          <Button
            testID="sort-btn"
            style={styles.filterBtn}
            onPress={() => updateSortModalVisible(true)}>
            <Text style={styles.filterBtnText}>Sort Wines</Text>
          </Button>
        </View>
      </View>
      <WineList 
        wines={wineList}
        navigation={navigation}
        user={user}
        isAuthenticated={isAuthenticated}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  filterBtn: {
    backgroundColor: '#fcf1d2',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 25,
    borderColor: '#fcf1d2',
    borderWidth: 1
  },
  modalBtnWrapper: {
    flexDirection: 'row',
    width: '100%'
  },
  modalBtn: {
    backgroundColor: '#fcf1d2',
    flex: 1,
    justifyContent: 'center',
    borderColor: '#fcf1d2',
    borderWidth: 1
  },
  btnWrapper: {
    flexDirection: 'row',
  },
  filterBtnText: {
    color: '#620014',
    fontSize: hp('1.6%')
  }
})