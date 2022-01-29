import React, { useState, useEffect, memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'

const MainPage = ({ isVisible, dismiss }) => {
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver
      hideModalContentWhileAnimating
      onBackButtonPress={dismiss}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      style={{ margin: 0, alignItems: 'center', }}
    >
      <View style={styles.container}>

      </View>
    </Modal>
  )
}

export default memo(MainPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
})