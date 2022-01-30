import { useDispatch, useSelector } from "react-redux"
import * as Action from '../redux/actions'

const useActions = () => {
  const { themeMode } = useSelector(state => state.themeModeReducer)
  const { isUpperCase } = useSelector(state => state.isUpperCaseReducer)
  const { isHardMode } = useSelector(state => state.isHardModeReducer)

  const toggleThemeMode = () => dispatch(Action.toggleThemeMode(themeMode))
  const toggleIsUpperCase = () => dispatch(Action.toggleIsUpperCase(isUpperCase))
  const toggleIsHardMode = () => dispatch(Action.toggleIsHardMode(isHardMode))
  const dispatch = useDispatch()

  return {
    toggleThemeMode,
    toggleIsUpperCase,
    toggleIsHardMode
  }
}

export default useActions