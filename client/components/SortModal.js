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
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}>
      <View style={styles.wrapper}>
        <View>
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
            <Text style={styles.modalBtnText}>Close</Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBtnWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: hp('3%')
  },
  modalBtn: {
    backgroundColor: '#fcf1d2',
    borderColor: '#620014',
    borderWidth: 3,
    justifyContent: 'center',
    width: wp('80%'),
  },
  modalBtnText: {
    fontSize: hp('1.6%'),
    color: '#620014',
    fontWeight: 'bold'
  },
  closeBtnText: {
    color: '#620014',
    fontSize: hp('1.6%')
  },
  text: {
    fontSize: hp('1.6%')
  },
  wrapper: {
    marginTop: hp('5%')
  }
})