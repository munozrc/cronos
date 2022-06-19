import create from 'zustand'
import { Track } from '../../electron/types'

type ResponseStatus = 'loading' | 'error' | 'complete'

interface AppState {
  lastQuery: string
  queryResults: Array<Track>
  suggestionResults: Array<Track>
  queryStatus: ResponseStatus
  suggestionStatus: ResponseStatus
  searchSong: (query: string | null) => void
  searchTrackSuggestions: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  lastQuery: '',
  queryResults: [],
  suggestionResults: [],
  queryStatus: 'complete',
  suggestionStatus: 'complete',
  searchSong: (query: string | null) => {
    const { searchTrack } = window.cronos
    const { lastQuery } = get()

    if (query === null || query === lastQuery) return

    set(() => ({ lastQuery: query, queryStatus: 'loading' }))

    searchTrack(query)
      .then(results => set(() => ({
        queryStatus: 'complete',
        queryResults: results
      })))
      .catch(() => set(() => ({
        queryStatus: 'error'
      })))
  },
  searchTrackSuggestions: () => {
    const { getTrackSuggestions } = window.cronos
    const { queryResults, queryStatus } = get()

    if (queryResults.length === 0 || queryStatus === 'error') return

    set(() => ({ suggestionStatus: 'loading' }))
    getTrackSuggestions(queryResults[0].id)
      .then(suggestions => set(() => ({ suggestionResults: suggestions, suggestionStatus: 'complete' })))
      .catch(() => set(() => ({ suggestionResults: [], suggestionStatus: 'error' })))
  }
}))
