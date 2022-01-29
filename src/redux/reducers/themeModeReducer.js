import * as Action from '../actions'

const initState = { themeMode: 'light' }

const themeModeReducer = (state = initState, action) => {
  switch (action.type) {
    case Action.TOGGLE_THEME_MODE:
      return { themeMode: action.payload.currentThemeMode === 'light' ? 'dark' : 'light' }
    default: return state
  }
}

export default themeModeReducer