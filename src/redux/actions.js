export const TOGGLE_THEME_MODE = 'TOGGLE_THEME_MODE'

export const toggleThemeMode = (str) => {
  return {
    type: TOGGLE_THEME_MODE,
    payload: { currentThemeMode: str }
  }
}

export const TOGGLE_IS_UPPERCASE = 'TOGGLE_IS_UPPERCASE'

export const toggleIsUpperCase = (bool) => {
  return {
    type: TOGGLE_IS_UPPERCASE,
    payload: { currentState: bool }
  }
}

export const TOGGLE_IS_HARD_MODE = 'TOGGLE_IS_HARD_MODE'

export const toggleIsHardMode = (bool) => {
  return {
    type: TOGGLE_IS_HARD_MODE,
    payload: { currentState: bool }
  }
}