import create from 'zustand'
import { Track } from '../types'

type ResponseStatus = 'loading' | 'error' | 'complete' | 'waiting'

interface AppState {
  lastQuery: string
  queryResults: Array<Track>
  suggestionResults: Array<Track>
  queryStatus: ResponseStatus
  suggestionStatus: ResponseStatus
  searchSong: (query: string) => void
  searchTrackSuggestions: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  lastQuery: '',
  queryResults: [],
  suggestionResults: [],
  queryStatus: 'complete',
  suggestionStatus: 'waiting',
  searchSong: (query: string) => {
    if (query === get().lastQuery) return

    set(() => ({ lastQuery: query, queryStatus: 'loading' }))

    window.cronos.searchTrack(query)
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
      .then(suggestions => set(() => ({ suggestionResults: suggestions, suggestionStatus: 'complete' })))
      .catch(() => set(() => ({ suggestionResults: [], suggestionStatus: 'error' })))
  }
}))
