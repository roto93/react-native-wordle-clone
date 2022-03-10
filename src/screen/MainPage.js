import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import useTheme from '../hooks/useTheme'
import { useSelector } from 'react-redux';
import { checkValidWordAPI, getInitActivePosition, getTodayAnswer, initAnswerArray, initAnswerArrayHard, initKeyArray, loadHistory, RowView, sendAnswer } from '../Lib/Lib';
import { memo } from 'react';
import * as StorageHelper from '../storage/StorageHelper'
import { useEffect } from 'react';
import Box from '../components/Box';
import Key from '../components/Key'

const MainPage = () => {
  const Theme = useTheme()
  const { isHardMode } = useSelector(state => state.isHardModeReducer)
  const [answerArray, setAnswerArray] = useState(isHardMode ? [...initAnswerArrayHard] : [...initAnswerArray]);
  const [isLoading, setIsLoading] = useState(true);
  const clearHistory = async () => {
    try {
      await StorageHelper.clear()
      // await StorageHelper.remove('')
      await load()
    } catch (e) {
      console.log(e.message)
    }
  }

  const load = async () => {
    try {
      setIsLoading(true)
      const loadedArray = await loadHistory(isHardMode)
      setAnswerArray(loadedArray)

    } catch (e) {
      console.log(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const setAnswerArrayCallback = useCallback(setAnswerArray, [])
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
        <RowView style={{ width: isHardMode ? 328 : 272, justifyContent: 'space-between', marginBottom: 8 }} >
          {answerArray.map((item, index) => (
            <Box key={index}{...{ item }} />
          ))}

        </RowView>
      </View>
      <Button title={'clear'} onPress={clearHistory} />
      <View style={styles.key_container}>
        {initKeyArray.map(
          (row, rowIndex) => <RowView key={rowIndex} style={{ width: rowIndex === 0 ? 316 : rowIndex === 1 ? 284 : 336, justifyContent: 'space-between' }}>
            {initKeyArray[rowIndex].map((keyText, index) => (
              <Key
                key={index}
                setAnswerArray={setAnswerArrayCallback}
                {...{
                  keyText, index,
                }}
              />
            ))}
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
