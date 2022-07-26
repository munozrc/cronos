import create from 'zustand'
import { DownloadFile, Track } from '../types'

interface DownloadState {
  itemList: Array<DownloadFile>
  createNewDownload: (data: Track) => void
  updateItemList: (item: DownloadFile) => void
}

export const useDownloadStore = create<DownloadState>((set) => ({
  itemList: [],
  createNewDownload: (data: Track) => {
    set((state) => {
      const date = new Date()
      const uuid = window.crypto.randomUUID()
      const newItem: DownloadFile = { ...data, uuid, date, state: 'downloading', path: '', size: 0, percent: 0 }
      const findTrackInDownloads = state.itemList.find(i => i.id === data.id && i.state === 'downloading')
      const existSimilarDownload = typeof findTrackInDownloads !== 'undefined'

      if (!existSimilarDownload) {
        console.log(`[start-download]::: --> ${newItem.id}`)
        window.cronos.downloadTrack(newItem)
        return { itemList: [...state.itemList, newItem] }
      }

      console.log(`[exist-download-progress]::: --> ${newItem.id}`)
      return state
    })
  },
  updateItemList: (item: DownloadFile) => {
    set((state) => {
      const newItemList = state.itemList.filter(({ uuid }) => uuid !== item.uuid)
      console.log(`[${item.state}-download]::: --> ${item.id}`)
      return { itemList: [...newItemList, item] }
    })
  }
}))
