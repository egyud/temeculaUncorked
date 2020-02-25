import React from 'react'
import { View, StyleSheet, Text, Modal, ScrollView } from 'react-native'
import { Button } from 'native-base'
import WineFilters from './WineFilters'

export default FilterModal = ({ close, filterWines, addToFilters, isWineryScreen, modalVisible }) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <WineFilters
          filterWines={filterWines} 
          addToFilters={(val) => addToFilters(val)}
          isWineryScreen={isWineryScreen} />
        <View style={styles.modalBtnWrapper}>
          <Button
            style={styles.modalBtn}
            onPress={filterWines}>
            <Text>Apply Filters</Text>
          </Button>
          <Button
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
    backgroundColor: '#99ff99',
    flex: 1,
    justifyContent: 'center',
    borderColor: '#614d36',
    borderWidth: 1
  }
})