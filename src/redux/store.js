import { configureStore } from '@reduxjs/toolkit'
import themeModeReducer from './reducers/themeModeReducer'
import isUpperCaseReducer from './reducers/isUpperCaseReducer'
import isHardModeReducer from './reducers/isHardModeReducer'

export default configureStore({
  reducer: {
    themeModeReducer,
    isUpperCaseReducer,
    isHardModeReducer
  },
})