import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Button } from 'native-base'
import WineFilterItem from './WineFilterItem'

const WineFilters = ({ wineryList, addToFilters, filterWines }) => {
  const types = ['red', 'white', 'rosé', 'sparkling', 'dessert']

  return (
    <Content style={styles.wineFilters}>
      <View>
        <ListItem itemDivider>
          <Text>Type</Text>
        </ListItem>
        {types.map(type => (
          <WineFilterItem
            key={type}
            addToFilters={addToFilters} 
            text={type}/>
        ))}
        <ListItem itemDivider>
          <Text>Winery</Text>
        </ListItem>
        {wineryList.map(winery => (
            <WineFilterItem
              key={winery._id}
              addToFilters={addToFilters} 
              text={winery.name}/>
        ))}
        <Button onPress={filterWines}>
          <Text>Apply Filters</Text>
        </Button>
      </View>
    </Content>
  )
}

const styles = StyleSheet.create({
  wineFilters: {
    flex: 1
  }
})

const mapStateToProps = (state) => {
  return {
    wineryList: state.wineReducer.wineriesList
  }
}

export default connect(mapStateToProps)(WineFilters)