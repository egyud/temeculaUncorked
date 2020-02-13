import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWineList } from '../actions/wineActions'
import { View, StyleSheet, Text } from 'react-native'
import { Form, Picker } from 'native-base'
import WineList from '../components/WineList'


const WineSearch = ({ wineArray, fetchWineList, navigation }) => {
  const [sortBy, updateSortBy] = useState('ratingD')
  const [filterBy, updateFilterBy] = useState('')
  const [wineList, updateWineList] = useState([])

  useEffect(() => {
    fetchWineList()
  }, [])

  useEffect(() => {
    updateWineList(wineArray)
  }, [wineArray])

  useEffect(() => {
    // console.log('wineList')
    // console.log(wineList)
    sortWines()
  }, [sortBy])


  function sortWines() {
    let wineArr = [...wineArray]
    wineArr.sort((a,b) => b.rating - a.rating)
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
    console.log('sortedList')
    console.log(wineArr)
    updateWineList(wineArr)
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
            <Picker.Item label="rating asc" value="ratingA"/>
            <Picker.Item label="rating desc" value="ratingD"/>
            <Picker.Item label="# of ratings asc" value="numRatingA"/>
            <Picker.Item label="# of ratings desc" value="numRatingD"/>
            <Picker.Item label="price asc" value="priceA"/>
            <Picker.Item label="price desc" value="priceD"/>
          </Picker>
        </Form>
      </View>
      <WineList wines={wineList} navigation={navigation}/>
      
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