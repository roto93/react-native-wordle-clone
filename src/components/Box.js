import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import useTheme from '../hooks/useTheme';


const Box = memo(({ item }) => {
  // console.log('box', rowIndex, colIndex)
  const Theme = useTheme()
  const { isUpperCase } = useSelector(state => state.isUpperCaseReducer)
  const ContainerStyle = {
    backgroundColor: item.color ? item.color : 'transparent',
    borderColor: item.highlight ? '#198964' : '#000'
  }
  return (
    <View style={[styles.letter_container, ContainerStyle]}>
      <Text style={[styles.letter, { color: Theme.text }]}>
        {isUpperCase ? item.value?.toUpperCase() : item.value}
      </Text>
    </View>
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

export default Box