import create from 'zustand'
import { Track } from '../../electron/types'

type ResponseStatus = 'loading' | 'error' | 'complete'

interface AppState {
  lastQuery: string
  queryResults: Array<Track>
  suggestionResults: Array<Track>
  queryStatus: ResponseStatus
  suggestionStatus: ResponseStatus
  setNewQuery: (query: string) => void
  setQueryResults: (results: Array<Track>) => void
  setStatusQuery: (status: ResponseStatus) => void
  searchTrackSuggestions: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  lastQuery: '',
  queryResults: [],
  suggestionResults: [],
  queryStatus: 'complete',
  suggestionStatus: 'complete',
  setNewQuery: (query: string) => { set(() => ({ lastQuery: query })) },
  setQueryResults: (results: Array<Track>) => { set(() => ({ queryResults: results })) },
  setStatusQuery: (status: ResponseStatus) => { set(() => ({ queryStatus: status })) },
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
