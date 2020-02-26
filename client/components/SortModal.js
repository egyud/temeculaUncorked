import React from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import { Button, ListItem, Text } from 'native-base'

export default SortModal = ({ close, modalVisible, updateSortBy }) => {

  const sortVals = [
    {label: 'ratingA', value: 'rating up'},
    {label: 'ratingD', value: 'rating down'},
    {label: 'numRatingA', value: '# of ratings up'},
    {label: 'numRatingD', value: '# of ratings down'},
    {label: 'priceA', value: 'price up'},
    {label: 'priceD', value: 'price down'},
  ]

  return (
    <View>
      <Modal
        // style={{ marginTop: 22 }}
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
    backgroundColor: '#99ff99',
    flex: 1,
    justifyContent: 'center',
    borderColor: '#614d36',
    borderWidth: 1
  },
  closeBtnText: {
    color: 'black'
  }
})