import * as Action from '../actions'

const initState = {
  isHardMode: false
}

const isHardModeReducer = (state = initState, action) => {
  switch (action.type) {
    case Action.TOGGLE_IS_HARD_MODE:
      return { isHardMode: !action.payload.currentState }
    default: return state
  }
}

export default isHardModeReducer