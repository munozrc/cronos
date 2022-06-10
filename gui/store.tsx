import create from 'zustand'
import { Track } from '../app/types'

interface State {
  results: Track[]
  setResults: (tracks: Track[]) => void
  prevQuery: string,
  setPrevQuery: (value: string) => void
}

export const useStore = create<State>((set) => ({
  results: [],
  setResults: (tracks: Track[]) => { set(() => ({ results: tracks })) },
  prevQuery: '',
  setPrevQuery: (value: string) => { set(() => ({ prevQuery: value })) }
}))
