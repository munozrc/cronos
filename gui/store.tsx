import create from 'zustand'
import { Track, TrackFile } from '../app/types'

interface State {
  downloads: TrackFile[]
  prevQuery: string
  results: Track[]
  addNewDownload: (track: Track) => Promise<void>
  setPrevQuery: (value: string) => void
  setResults: (tracks: Track[]) => void
}

export const useStore = create<State>((set) => ({
  downloads: [],
  prevQuery: '',
  results: [],
  addNewDownload: async (track: Track) => {
    const { downloadTrack } = window.cronos
    const trackFile: TrackFile = { ...track, state: 'downloading' }

    let existSimilarDownload = false

    set((state) => {
      const findTrackInDownloads = state.downloads.find(t => t.id === track.id && t.state === 'downloading')
      existSimilarDownload = typeof findTrackInDownloads !== 'undefined'

      if (!existSimilarDownload) {
        console.log('descarga iniciada...')
        return { downloads: [...state.downloads, trackFile] }
      }

      console.log('existe una descarga en curso...')
      return state
    })

    if (existSimilarDownload) return
    await downloadTrack(track)

    set((state) => {
      const newArrayDownloads = state.downloads.filter(t => t.id === track.id)
      console.log('descarga completada...')
      return { downloads: [...newArrayDownloads, { ...trackFile, state: 'completed' }] }
    })
  },
  setPrevQuery: (value: string) => { set(() => ({ prevQuery: value })) },
  setResults: (tracks: Track[]) => { set(() => ({ results: tracks })) }
}))
