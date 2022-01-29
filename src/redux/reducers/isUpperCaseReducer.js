import * as Action from '../actions'

const initState = { isUpperCase: true }

const isUpperCaseReducer = (state = initState, action) => {
  switch (action.type) {
    case Action.TOGGLE_IS_UPPERCASE:
      return { isUpperCase: !action.payload.currentState }
    default: return state
  }
}

export default isUpperCaseReducer