import React from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import { Button, ListItem, Text } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

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
            <Text style={styles.text}>Sort By</Text>
          </ListItem>
          {sortVals.map(option => (
            <ListItem
              testID="sort-value" 
              onPress={() => {
                updateSortBy(option.label)
                close()
              }}
              key={option.label}>
              <Text style={styles.text}>{option.value}</Text>
            </ListItem>
          ))}
        </View>
        <View style={styles.modalBtnWrapper}>
          <Button
            testID="close-btn"
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
    backgroundColor: '#fcf1d2',
    flex: 1,
    justifyContent: 'center',
    borderColor: '#fcf1d2',
    borderWidth: 1
  },
  closeBtnText: {
    color: '#620014',
    fontSize: hp('1.6%')
  },
  text: {
    fontSize: hp('1.6%')
  }
})