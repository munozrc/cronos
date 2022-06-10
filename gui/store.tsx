import create from 'zustand'
import { Track } from '../app/types'

interface State {
  results: Track[]
  setResults: (tracks: Track[]) => void
}

export const useStore = create<State>((set) => ({
  results: [],
  setResults: (tracks: Track[]) => { set(() => ({ results: tracks })) }
}))
