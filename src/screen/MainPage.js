import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import useTheme from '../hooks/useTheme'
import { useSelector } from 'react-redux';
import { checkValidWordAPI, fetchAnswerAPI, getActivePosition, initAnswerArray, initAnswerArrayHard, initKeyArray, RowView } from '../Lib/Lib';
import { memo } from 'react';

const MainPage = () => {
  const Theme = useTheme()
  const { isHardMode } = useSelector(state => state.isHardModeReducer)
  const { isUpperCase } = useSelector(state => state.isUpperCaseReducer)
  const [answerArray, setAnswerArray] = useState(isHardMode ? initAnswerArrayHard : initAnswerArray);
  const { activeRowIndex, activeColIndex } = getActivePosition(answerArray)

  const Box = memo(({ rowIndex, col, colIndex }) => {
    const isActiveRow = rowIndex === activeRowIndex
    const isActiveCol = colIndex === activeColIndex
    const isActiveCell = isActiveRow && isActiveCol
    return (
      <TouchableOpacity style={[styles.letter_container, { borderColor: isActiveCell ? '#198964' : '#000' }]}>
        <Text style={[styles.letter, { color: Theme.text }]}>
          {isUpperCase ? col.value?.toUpperCase() : col.value}
        </Text>
      </TouchableOpacity>
    )
  }, (prevProps, nextProps) => prevProps === nextProps)

  const Key = memo(({ keyText, index }) => {

    const onKeyPress = async () => {
      if (keyText === 'enter') {
        const guess = answerArray[activeRowIndex].map(item => item.value).join('')
        const isValidWord = await checkValidWordAPI(guess)
        if (isValidWord) console.log(await fetchAnswerAPI(), guess)
        return
      }
      if (keyText === 'del') {
        if (activeColIndex === 0) return
        answerArray[activeRowIndex][activeColIndex - 1] = { value: undefined }
        setAnswerArray([...answerArray])
        return
      }
      if (activeColIndex === 5) return
      answerArray[activeRowIndex][activeColIndex] = { value: keyText }
      setAnswerArray([...answerArray])
    }

    return (
      <TouchableOpacity style={styles.key} onPress={onKeyPress}>
        <Text style={styles.key_text}>
          {isUpperCase ? keyText.toUpperCase() : keyText}
        </Text>
      </TouchableOpacity>
    )
  })

  return (
    <View style={[styles.container, { backgroundColor: Theme.primary }]}>
      <View style={styles.answer_container}>
        {answerArray.map(
          (row, rowIndex) => <RowView style={{ width: 272, justifyContent: 'space-between', marginBottom: 8 }} key={rowIndex}>
            {answerArray[rowIndex].map((col, colIndex) => <Box key={colIndex} {...{ rowIndex, col, colIndex }} />)}
          </RowView>
        )}
      </View>
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
    marginTop: 32
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
