import React from 'react'
import { View, StyleSheet, Text, Modal } from 'react-native'
import { Button } from 'native-base'
import WineFilters from './WineFilters'

export default FilterModal = ({ close, filterWines, addToFilters, isWineryScreen, modalVisible, wineryList }) => {
  return (
    <View>
      <Modal
        style={{ marginTop: 22 }}
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
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
            <Text>Apply Filters</Text>
          </Button>
          <Button
            testID="close-btn"
            style={styles.modalBtn}
            onPress={close}>
            <Text>Close</Text>
          </Button>
        </View>
      </Modal>
    </View>
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
  }
})