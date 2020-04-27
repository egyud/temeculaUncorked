import React from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import { Button, ListItem, Text } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default ClubModal = ({ close, modalVisible, clubList, removeClubNumber, clubNumber, changeClubValue }) => {

  return (
    <Modal
      style={styles.modal}
      animationType="slide"
      transparent={false}
      visible={modalVisible}>
      <View style={styles.wrapper}>
        <View>
          <ListItem header>
            <Text style={styles.text}>Select a Club</Text>
          </ListItem>
          {clubList.map(club => (
            <ListItem 
              onPress={() => {
                changeClubValue(club.name, clubNumber)
                removeClubNumber()
                close()
              }}
              key={club.name}>
              <Text style={styles.text}>{club.name} - {club.winery}</Text>
            </ListItem>
          ))}
        </View>
        <View style={styles.modalBtnWrapper}>
          <Button
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
    // flex: 1,
    justifyContent: 'center',
    width: wp('80%'),
  },
  modalBtnText: {
    fontSize: hp('1.6%'),
    color: '#620014',
    fontWeight: 'bold'
  },
  text: {
    fontSize: hp('1.6%')
  },
  wrapper: {
    marginTop: hp('5%')
  }
})