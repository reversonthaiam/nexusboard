import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// Hooks tipados — use SEMPRE esses, nunca o useSelector/useDispatch direto
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector<RootState, T>(selector)