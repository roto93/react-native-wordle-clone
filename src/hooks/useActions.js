import { useDispatch, useSelector } from "react-redux"
import * as Action from '../redux/actions'

const useActions = () => {
  const { themeMode } = useSelector(state => state.themeModeReducer)
  const { isUpperCase } = useSelector(state => state.isUpperCaseReducer)

  const toggleThemeMode = () => dispatch(Action.toggleThemeMode(themeMode))
  const toggleIsUpperCase = () => dispatch(Action.toggleIsUpperCase(isUpperCase))
  const dispatch = useDispatch()

  return {
    toggleThemeMode,
    toggleIsUpperCase
  }
}

export default useActions