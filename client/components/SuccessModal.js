import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Share, View, StyleSheet, Modal } from 'react-native'
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Tabs, Tab, Form, Input, Label, Item } from 'native-base'

export default SuccessModal = ({ modalVisible, close, review, winery, commentText }) => {

  async function shareContent() {
    try {
      let result
      if (commentText.length > 0) {
        result = await Share.share({
          message: commentText,
          title: `I just left a new comment on Temecula Uncorked`
        })
      } else {
        result = await Share.share({
          message: `${review.rating} stars. ${review.text}`,
          title: `I just reviewed ${winery} on Temecula Uncorked`
        })
      }

      if (result.action === Share.sharedAction) {
        alert('Post Shared')
      } else if (result.action === Share.dismissedAction) {
        alert('Post cancelled')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <View>
      <Modal
        style={{ marginTop: 222 }}
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <View style={styles.message}>
          <Text>Your review was successfully submitted</Text>
        </View>
        <View style={styles.modalBtnWrapper}>
          <Button
            style={styles.modalBtn}
            onPress={() => shareContent()}>
            <Text>Share Review</Text>
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
  },
  message: {
    textAlign: 'center'
  }
})