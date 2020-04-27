import React from 'react'
import { View, StyleSheet, Text, Modal } from 'react-native'
import { Button } from 'native-base'
import WineFilters from './WineFilters'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default FilterModal = ({ close, filterWines, addToFilters, isWineryScreen, modalVisible, wineryList }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}>
      <View style={styles.wrapper}>
        <WineFilters
          filterWines={filterWines} 
          addToFilters={(val) => addToFilters(val)}
          isWineryScreen={isWineryScreen}
          wineryList={wineryList} />
        <View style={styles.modalBtnWrapper}>
          <Button
            testID="filter-btn"
            style={styles.modalBtn}
            onPress={filterWines}>
            <Text style={styles.text}>Apply Filters</Text>
          </Button>
          <Button
            testID="close-btn"
            style={styles.modalBtn}
            onPress={close}>
            <Text style={styles.text}>Close</Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
  text: {
    fontSize: hp('1.6%')
  },
  // wrapper: {
  //   marginTop: hp('5%')
  // }
})