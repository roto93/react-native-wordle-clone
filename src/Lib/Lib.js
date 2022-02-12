import React from 'react';
import { Dimensions, View } from "react-native";
import * as Storage from '../storage/StorageHelper'
import { RANDOM_WORD_API_KEY } from '@env'

export const winX = Dimensions.get('window').width
export const winY = Dimensions.get('window').height

export const RowView = (props) => {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, props.style]}>
      {props.children}
    </View>
  )
}

export const initAnswerArray = []
for (let i = 0; i < 6; i++) {
  initAnswerArray.push([])
  for (let j = 0; j < 5; j++) {
    initAnswerArray[i].push({})
  }
}

export const initAnswerArrayHard = []
for (let i = 0; i < 6; i++) {
  initAnswerArrayHard.push([])
  for (let j = 0; j < 6; j++) {
    initAnswerArrayHard[i].push({})
  }
}

export const initKeyArray = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del'],
]

export const getActivePosition = (arr) => {
  let activeRowIndex = arr.findIndex(row => JSON.stringify(row) == JSON.stringify([{}, {}, {}, {}, {}]))
  if (activeRowIndex === -1) activeRowIndex = 5
  else if (activeRowIndex === 0) activeRowIndex = 0
  else { activeRowIndex-- }
  let activeColIndex = arr[activeRowIndex].findIndex(col => col.value === undefined)
  if (activeColIndex === -1) activeColIndex = arr[0].length
  else if (activeRowIndex === 0) activeRowIndex = 0
  else { activeColIndex-- }
  return { activeRowIndex, activeColIndex }
}

export const fetchAnswerAPI = async () => {
  try {
    const res = await fetch("https://random-words5.p.rapidapi.com/getRandom?wordLength=5", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "random-words5.p.rapidapi.com",
        "x-rapidapi-key": RANDOM_WORD_API_KEY
      }
    })
    const text = await res.text()
    return text
  } catch (e) {
    console.log(e.message)
  }
}

export const checkValidWordAPI = async (inputWord) => {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`)
    const json = await res.json()
    return Array.isArray(json)
  } catch (e) {
    console.log(e.message)
  }
}

export const getTodayWord = async () => {
  try {
    const todayString = (new Date()).toDateString()
    const todayWord = await Storage.get(todayString)

    if (todayWord) return todayWord

    const newWord = await fetchAnswerAPI()
    Storage.set(todayString, newWord)
    return newWord
  } catch (e) {
    console.log(e.message)
  }

}