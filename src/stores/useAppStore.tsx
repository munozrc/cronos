import create from 'zustand'
import { Track } from '../../electron/types'

type QueryStatus = 'loading' | 'error' | 'complete'

interface AppState {
  lastQuery: string
  queryResults: Array<Track>
  queryStatus: QueryStatus
  setNewQuery: (query: string) => void
  setQueryResults: (results: Array<Track>) => void
  setStatusQuery: (status: QueryStatus) => void
}

export const useAppStore = create<AppState>((set) => ({
  lastQuery: '',
  queryResults: [],
  queryStatus: 'complete',
  setNewQuery: (query: string) => { set(() => ({ lastQuery: query })) },
  setQueryResults: (results: Array<Track>) => { set(() => ({ queryResults: results })) },
  setStatusQuery: (status: QueryStatus) => { set(() => ({ queryStatus: status })) }
}))
