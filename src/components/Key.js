import React, { memo } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { getTodayAnswer, sendAnswer } from '../Lib/Lib'
import * as StorageHelper from '../storage/StorageHelper'

const Key = memo(({ keyText, setAnswerArray }) => {
  // console.log(keyText)
  const { isHardMode } = useSelector(state => state.isHardModeReducer)
  const { isUpperCase } = useSelector(state => state.isUpperCaseReducer)

  const pressEnter = async () => {

    // Check if the word is a valid word.

    // Get the answer of today
    const todayAnswer = await getTodayAnswer(isHardMode)

    // Comparing the answer and the guess, then get the new array with color updated
    const { newArray, isDone } = sendAnswer(guess, todayAnswer, prevArr, activeRowIndex)

    // Saving the current array to AsyncStorage

  }

  const onKeyPress = (keyText) => () => {
    setAnswerArray(prevArray => {
      if (prevArray.findIndex(item => item.highlight === true) === -1) {
        console.warn('There is no highlighted box.')
        return prevArray
      }
      if (keyText === 'enter') return pressEnter()

      if (keyText === 'del') {

      }

      // if reaching the max letter limit, do nothing
      const isMultipleOfFive = (arr) => {
        const activeIndex = arr.findIndex(item => item.value ? false : true) // '' or null or undefined
        return (activeIndex === -1 || (activeIndex) % 5 === 0)
      }
      if (isMultipleOfFive(prevArray)) return prevArray

      // typing
      const indexToUpdate = prevArray.findIndex(item => item.highlight === true)
      prevArray[indexToUpdate].value = keyText

      // update the highlighted Box
      prevArray[indexToUpdate].highlight = false
      if ((indexToUpdate + 1) % 5 !== 0) {
        prevArray[indexToUpdate + 1].highlight = true
      }

      return prevArray
    })
  }


  return (
    <TouchableOpacity style={styles.key} onPress={onKeyPress(keyText)}>
      <Text style={styles.key_text}>
        {isUpperCase ? keyText.toUpperCase() : keyText}
      </Text>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 24
  },
  answer_container: {
    // borderWidth: 1,
    marginTop: 32,
  },
  key_container: {
    height: 126,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  key: {
    minWidth: 28,
    height: 36,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: 8
  },
  key_text: {
    fontSize: 16,
  },
  letter_container: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4
  },
  letter: {
    fontSize: 24
  }
});


export default Key