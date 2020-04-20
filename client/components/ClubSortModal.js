import React from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import { Button, ListItem, Text } from 'native-base'

export default SortModal = ({ close, modalVisible, updateSortBy }) => {

  const sortVals = [
    {label: 'numTastingsA', value: '# of tastings up'},
    {label: 'numTastingsD', value: '# of tastings down'},
    {label: 'priceA', value: 'price up'},
    {label: 'priceD', value: 'price down'},
  ]

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <View style={{ marginTop: 30 }}>
          <ListItem itemDivider>
            <Text>Sort By</Text>
          </ListItem>
          {sortVals.map(option => (
            <ListItem 
              onPress={() => {
                updateSortBy(option.label)
                close()
              }}
              key={option.label}>
              <Text>{option.value}</Text>
            </ListItem>
          ))}
        </View>
        <View style={styles.modalBtnWrapper}>
          <Button
            style={styles.modalBtn}
            onPress={close}>
            <Text style={styles.closeBtnText}>Close</Text>
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
    backgroundColor: '#ede1c4',
    flex: 1,
    justifyContent: 'center',
    borderColor: '#ede1c4',
    borderWidth: 1
  },
  closeBtnText: {
    color: 'black'
  }
})