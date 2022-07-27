import create from 'zustand'
import { Track } from '../types'

type ResponseStatus = 'loading' | 'error' | 'complete' | 'waiting'

interface AppState {
  query: string
  queryResults: Array<Track>
  suggestionResults: Array<Track>
  queryStatus: ResponseStatus
  suggestionStatus: ResponseStatus
  searchSong: (query: string) => void
  searchTrackSuggestions: () => void
  clearSearch: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  query: '',
  queryResults: [],
  suggestionResults: [],
  queryStatus: 'complete',
  suggestionStatus: 'waiting',
  searchSong: (value: string) => {
    if (value === get().query) return

    set(() => ({ query: value, queryStatus: 'loading' }))

    window.cronos.searchTrack(value)
      .then(results => set(() => ({
        queryStatus: 'complete',
        suggestionStatus: 'waiting',
        queryResults: results
      })))
      .catch(() => set(() => ({
        queryStatus: 'error'
      })))
  },
  searchTrackSuggestions: () => {
    const { getTrackSuggestions } = window.cronos
    const { queryResults, queryStatus, suggestionStatus } = get()

    if (queryResults.length === 0 || suggestionStatus === 'complete' || queryStatus === 'error') return

    set(() => ({ suggestionStatus: 'loading' }))
    getTrackSuggestions(queryResults[0].id)
      .then(data => set(() => ({ suggestionResults: data, suggestionStatus: 'complete' })))
      .catch(() => set(() => ({ suggestionResults: [], suggestionStatus: 'error' })))
  },
  clearSearch: () => set(() => ({ query: '' }))
}))
