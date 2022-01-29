import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Themes = {
  light: {
    primary: '#eee',
    secondary: '#ccc',
    text: '#333',
    textBackground: '#fff',
    key: '#333',
    black: '#111',
    white: '#fff'
  },
  dark: {
    primary: '#333',
    secondary: '#555',
    text: '#ddd',
    textBackground: '#111',
    key: '#eee',
    black: '#111',
    white: '#fff'
  }
}

const useTheme = () => {
  const [theme, setTheme] = useState(Themes['light']);
  const { themeMode } = useSelector(state => state.themeModeReducer)
  useEffect(() => {
    setTheme(Themes[themeMode])
  }, [themeMode])
  return theme
}

export default useTheme