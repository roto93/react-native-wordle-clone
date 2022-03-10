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

export const initAnswerArray = [
  { highlight: true }, {}, {}, {}, {},
  {}, {}, {}, {}, {},
  {}, {}, {}, {}, {},
  {}, {}, {}, {}, {},
  {}, {}, {}, {}, {},
  {}, {}, {}, {}, {},
]

export const initAnswerArrayHard = [
  [{}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}],
]

export const initKeyArray = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del'],
]

// export const getInitActivePosition = (arr, isHardMode) => {
//   let rowIndex, colIndex
//   const emptyRow = isHardMode ? [{}, {}, {}, {}, {}, {}] : [{}, {}, {}, {}, {}]
//   if (JSON.stringify(arr[0]) === JSON.stringify(emptyRow)) rowIndex = 0
//   else if (arr.every(row => JSON.stringify(row) !== JSON.stringify(emptyRow))) rowIndex = 5
//   else rowIndex = arr.findIndex(row => JSON.stringify(row) === JSON.stringify(emptyRow))

//   if (arr[rowIndex][0].value === undefined) colIndex = 0
//   else if (arr[rowIndex].every(col => col.value !== undefined)) colIndex = isHardMode ? 6 : 5
//   else colIndex = arr[rowIndex].findIndex(col => col.value === undefined)
//   console.log('in', rowIndex, colIndex)
//   return { row: rowIndex, col: colIndex }
// }

export const fetchAnswerAPI = async (isHardMode) => {
  try {
    const res = await fetch(`https://random-words5.p.rapidapi.com/getRandom?wordLength=${isHardMode ? 6 : 5}`, {
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

export const getTodayAnswer = async (isHardmode) => {
  try {
    const todayString = (new Date()).toDateString()
    const history = await Storage.get(todayString)
    if (history) return isHardmode ? JSON.parse(history).hardAnswer : JSON.parse(history).answer

    const newAnswer = await fetchAnswerAPI(false)
    const newHardAnswer = await fetchAnswerAPI(true)
    const newValue = JSON.stringify({ answer: newAnswer, hardAnswer: newHardAnswer })
    Storage.set(todayString, newValue)
    return isHardmode ? newHardAnswer : newAnswer
  } catch (e) {
    console.log(e.message)
  }
}
/**
 * 
 * @param {string} word 
 * @param {string} answer 
 * @param {array} array 
 * [{ value: '', color:'#19896480' },]
 * @param {number} activeRowIndex 
 * @returns 
 */
export const sendAnswer = (word, answer, array, activeRowIndex) => {
  if (word === answer) {
    const newArray = [...array]
    const checkedWord = newArray[activeRowIndex].map(item => ({ ...item, color: '#19896480' }))
    newArray[activeRowIndex] = checkedWord
    return { newArray, isDone: true }
  }

  const wordArray = [...array[activeRowIndex]]
  const answerArray = answer.split('')
  const newWordArray = wordArray.map((item, index) => {
    // 先判斷A的
    if (item.value !== answerArray[index]) return item

    answerArray[index] = ''
    return { ...item, color: '#19896480' }
  }).map((item, index) => {
    if (item.color !== undefined) return item
    // 再判斷B的
    const match = letter => letter === item.value
    if (answerArray.some(match)) {
      answerArray[answerArray.findIndex(match)] = ''
      return { ...item, color: '#e5e8b6' }
    }
    return { ...item, color: '#ddd' }

  })

  const newArray = [...array]
  newArray[activeRowIndex] = newWordArray

  return { newArray, isDone: false }
}

export const loadHistory = async (isHardMode) => {
  try {
    const todayString = (new Date()).toDateString()
    const res = await Storage.get(todayString)
    console.log('res=', res)
    const history = JSON.parse(res)
    console.log(history)
    if (!history?.array) return isHardMode
      ? JSON.parse(JSON.stringify(initAnswerArrayHard))
      : JSON.parse(JSON.stringify(initAnswerArray)) //這邊原本用 spread expression 但由於其 shallow copy 的特性，內層的陣列會一直指向最初的記憶體，導致後續操作無法清除資料
    return isHardMode ? history.hardArray : history.array
  } catch (e) { console.log(e.message) }
}

/**
 * [{value:'e',highlight:false},{value:'',highlight:true},{value:'',highlight:false},{value:'',highlight:false},{value:'',highlight:false},{value:'',highlight:false},]
 * 
 */