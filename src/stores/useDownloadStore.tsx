import create from 'zustand'
import { DownloadFile, Track } from '../../electron/types'

interface DownloadState {
  itemList: Array<DownloadFile>
  setItemList: (list: Array<DownloadFile>) => void
  createNewDownload: (data: Track) => void
  updateItemList: (item: DownloadFile) => void
}

export const useDownloadStore = create<DownloadState>((set) => ({
  itemList: [],
  setItemList: (items: DownloadFile[]) => { set(() => ({ itemList: items })) },
  createNewDownload: (data: Track) => {
    set((state) => {
      const date = new Date()
      const newItem: DownloadFile = { ...data, date, state: 'downloading', path: '' }
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
      const newItemList = state.itemList.filter(({ id }) => id !== item.id)
      console.log(`[${item.state}-download]::: --> ${item.id}`)
      return { itemList: [...newItemList, item] }
    })
  }
}))
