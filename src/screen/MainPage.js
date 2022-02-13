import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import useTheme from '../hooks/useTheme'
import { useSelector } from 'react-redux';
import { checkValidWordAPI, getInitActivePosition, getTodayAnswer, initAnswerArray, initAnswerArrayHard, initKeyArray, loadHistory, RowView, sendAnswer } from '../Lib/Lib';
import { memo } from 'react';
import * as StorageHelper from '../storage/StorageHelper'
import { useEffect } from 'react';

const MainPage = () => {
  const Theme = useTheme()
  const { isHardMode } = useSelector(state => state.isHardModeReducer)
  const { isUpperCase } = useSelector(state => state.isUpperCaseReducer)
  const [answerArray, setAnswerArray] = useState(isHardMode ? [...initAnswerArrayHard] : [...initAnswerArray]);
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [activeColIndex, setActiveColIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameover, setIsGameover] = useState(false);

  const Box = memo(({ rowIndex, col, colIndex }) => {
    const isActiveRow = rowIndex === activeRowIndex
    const isActiveCol = colIndex === activeColIndex
    const isActiveCell = isActiveRow && isActiveCol
    return (
      <View style={[styles.letter_container, { backgroundColor: col.color ? col.color : 'transparent', borderColor: isActiveCell ? '#198964' : '#000' }]}>
        <Text style={[styles.letter, { color: Theme.text }]}>
          {isUpperCase ? col.value?.toUpperCase() : col.value}
        </Text>
      </View>
    )
  })

  const Key = memo(({ keyText, index }) => {

    const pressEnter = async () => {
      try {
        console.log(await getTodayAnswer(isHardMode))
        if (activeColIndex !== (isHardMode ? 6 : 5)) return

        // Check if the word is a valid word.
        const guess = answerArray[activeRowIndex].map(item => item.value).join('')
        const isValidWord = await checkValidWordAPI(guess)
        if (!isValidWord) return alert('This word is not existed.')

        // Get the answer of today
        const todayAnswer = await getTodayAnswer(isHardMode)

        // Comparing the answer and the guess, then get the new array with color updated
        const { newArray, isDone } = sendAnswer(guess, todayAnswer, answerArray, activeRowIndex)
        if (newArray) setAnswerArray([...newArray])

        // Saving the current array to AsyncStorage
        const todayString = (new Date()).toDateString()
        const oldValue = JSON.parse(await StorageHelper.get(todayString))
        const newValue = isHardMode
          ? { ...oldValue, hardArray: newArray }
          : { ...oldValue, array: newArray }
        await StorageHelper.set(todayString, JSON.stringify(newValue))

        if (isDone) return setIsGameover(true)

        if (activeRowIndex < 6) {
          setActiveRowIndex(prev => prev + 1)
          setActiveColIndex(0)
        }

      } catch (e) { console.log(e.message) }
    }

    const onKeyPress = () => {
      if (keyText === 'enter') return pressEnter()

      if (keyText === 'del') {
        if (activeColIndex === 0) return
        answerArray[activeRowIndex][activeColIndex - 1] = {}
        setActiveColIndex(prev => prev - 1)
        setAnswerArray([...answerArray])
        return
      }

      if (activeColIndex === (isHardMode ? 6 : 5) | activeRowIndex === 6) return
      setActiveColIndex(prev => prev + 1)
      const newArray = [...answerArray]
      newArray[activeRowIndex][activeColIndex] = { value: keyText }
      setAnswerArray(newArray)
    }

    return (
      <TouchableOpacity style={styles.key} onPress={onKeyPress}>
        <Text style={styles.key_text}>
          {isUpperCase ? keyText.toUpperCase() : keyText}
        </Text>
      </TouchableOpacity>
    )
  }, (prevProps, nextProps) => true)

  const clearHistory = async () => {
    try {
      await StorageHelper.clear()
      await load()
    } catch (e) {
      console.log(e.message)
    }
  }

  const load = async () => {
    try {
      setIsLoading(true)
      const loadedArray = await loadHistory(isHardMode)
      console.log(loadedArray)
      setAnswerArray(loadedArray)
      const { row, col } = getInitActivePosition(loadedArray)
      console.log(row, col)

      setActiveRowIndex(row)
      setActiveColIndex(col)

    } catch (e) {
      console.log(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [isHardMode])

  if (isLoading) return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <ActivityIndicator size={60} color="#198964" />
    </View>
  )
  return (
    <View style={[styles.container, { backgroundColor: Theme.primary }]}>
      <View style={styles.answer_container}>
        {answerArray.map(
          (row, rowIndex) => <RowView style={{ width: isHardMode ? 328 : 272, justifyContent: 'space-between', marginBottom: 8 }} key={rowIndex}>
            {answerArray[rowIndex].map((col, colIndex) => <Box key={colIndex} {...{ rowIndex, col, colIndex }} />)}
          </RowView>
        )}
      </View>
      <Button title={'clear'} onPress={clearHistory} />
      <View style={styles.key_container}>
        {initKeyArray.map(
          (row, rowIndex) => <RowView key={rowIndex} style={{ width: rowIndex === 0 ? 316 : rowIndex === 1 ? 284 : 336, justifyContent: 'space-between' }}>
            {initKeyArray[rowIndex].map((keyText, index) => <Key key={index} keyText={keyText} index={index} />)}
          </RowView>)}
      </View>
    </View >
  );
};

export default MainPage;

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
