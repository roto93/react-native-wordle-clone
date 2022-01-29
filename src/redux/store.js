import { configureStore } from '@reduxjs/toolkit'
import themeModeReducer from './reducers/themeModeReducer'
import isUpperCaseReducer from './reducers/isUpperCaseReducer'

export default configureStore({
  reducer: {
    themeModeReducer,
    isUpperCaseReducer
  },
})