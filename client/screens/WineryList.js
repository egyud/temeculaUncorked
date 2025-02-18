import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWineryList } from '../actions/wineActions'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { ListItem, Right, Body, Header, Item, Icon, Input } from 'native-base'
import { Rating } from 'react-native-ratings' 
import calculateAverage from '../utils/average'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'


export const WineryList = ({ list, fetchWineries, navigation }) => {
  const [searchInput, updateSearchInput] = useState('')

  useEffect(() => {
    fetchWineries()
  }, [])

  let filteredWineryList = list
  if (searchInput.length > 0) {
    filteredWineryList = filterMatches()
  } 

  function filterMatches() {
    return list.filter(winery => {
      const regex = new RegExp(searchInput, 'gi')
      return winery.name.match(regex)
    })
  }

  return (
    <View>
      <Header searchBar testID="search-bar">
        <Item>
          <Icon name="ios-search" />
          <Input 
            autoFocus
            placeholder="Search"
            onChangeText={(text) => updateSearchInput(text)} />
        </Item>
      </Header>
      <ScrollView style={styles.container}>
        {filteredWineryList.map(winery => (
          <ListItem
            testID="list-item" 
            key={winery._id}
            style={styles.listItem}>
            <Body>
              <Text
                testID="winery-name"
                onPress={() => navigation.navigate('Winery', { winery: winery.name })}
                style={styles.text}
              >
                {winery.name}
              </Text>
            </Body>
            <Right>
              <Rating
                testID="winery-rating"
                startingValue={calculateAverage(winery.avgRating, winery.reviewCount)}
                imageSize={25}
                type="custom"
                ratingColor='#fcf1d2' />
            </Right>
          </ListItem>
        ))}
      </ScrollView>
      
    </View>
  )
}

WineryList.navigationOptions = {
  title: 'Wineries',
  headerStyle: {
    backgroundColor: '#fcf1d2'
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  listItem: {
    backgroundColor: '#fff'
  },
  text: {
    fontSize: hp('1.6%')
  }
})

const mapStateToProps = (state) => {
  return {
    list: state.wineReducer.wineriesList
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchWineries: fetchWineryList
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WineryList)