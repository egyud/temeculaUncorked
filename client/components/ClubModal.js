import React from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import { Button, ListItem, Text } from 'native-base'

export default ClubModal = ({ close, modalVisible, clubList, removeClubNumber, clubNumber, changeClubValue }) => {

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <View>
          <ListItem header>
            <Text>Select a Club</Text>
          </ListItem>
          {clubList.map(club => (
            <ListItem 
              onPress={() => {
                changeClubValue(club.name, clubNumber)
                removeClubNumber()
                close()
              }}
              key={club.name}>
              <Text>{club.name} - {club.winery}</Text>
            </ListItem>
          ))}
        </View>
        <View style={styles.modalBtnWrapper}>
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
    backgroundColor: '#620014',
    flex: 1,
    justifyContent: 'center',
    borderColor: '#620014',
    borderWidth: 1
  }
})