import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWineryList } from '../../actions/wineActions'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem, Right, Body } from 'native-base'
import { Rating } from 'react-native-ratings' 
import { wineries } from '../../fakeData/wineries'

const WineryList = ({ list, fetchWineries, navigation }) => {

  useEffect(() => {
    fetchWineries()
  }, [])

  function calculateAverage(totalValue, reviewCount) {
    return Number((totalValue / reviewCount).toFixed(1)) || 0
  }

  return (
    <View style={styles.container}>
      {list.map(winery => (
        <ListItem 
          key={winery._id}
          style={styles.listItem}>
          <Body>
            <Text
              onPress={() => navigation.navigate('Winery')}
            >
              {winery.name}
            </Text>
          </Body>
          <Right>
            <Rating 
              startingValue={calculateAverage(winery.avgRating, winery.reviewCount)}
              imageSize={25}/>
          </Right>
        </ListItem>
      ))}
    </View>
  )
}

WineryList.navigationOptions = {
  title: 'Wineries',
  headerStyle: {
    backgroundColor: '#99ff99'
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  listItem: {
    backgroundColor: '#fff'
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