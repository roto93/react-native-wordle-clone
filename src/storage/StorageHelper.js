import AsyncStorage from '@react-native-async-storage/async-storage';


export const set = (key, value) => AsyncStorage.setItem(key, value)
export const get = async (key) => await AsyncStorage.getItem(key)
export const clear = async () => await AsyncStorage.clear()
export const remove = async (key) => await AsyncStorage.remove(key)

/**
 * { dateString: { 
 *    answer: 'apple', 
 *    hardAnswer: 'remain', 
 *    array: [[{}, {}, {}, {}, {}]], 
 *    hardArray: [[{}, {}, {}, {}, {}, {}]] 
 *  }, 
 * }
 */

