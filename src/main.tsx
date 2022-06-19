import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, useSearchParams } from 'react-router-dom'

import { Toolbar } from './layouts'
import { DownloadsView, SearchView } from './views'

import { useAppStore } from './stores/useAppStore'
import { useDownloadStore } from './stores/useDownloadStore'

import './main.css'

const root = ReactDOM.createRoot(
  document.getElementById('root')!
)

const RootComponent = () => {
  const { onDownloadCompleted } = window.cronos
  const { updateItemList } = useDownloadStore()
  const { searchSong } = useAppStore()
  const [searchParams] = useSearchParams()

  useEffect(() => searchSong(searchParams.get('query')), [searchParams, searchSong])
  useEffect(() => { onDownloadCompleted(updateItemList) }, [onDownloadCompleted, updateItemList])

  return (
    <>
      <Toolbar />
      <Routes>
        <Route path="/" element={<SearchView />} />
        <Route path="/downloads" element={<DownloadsView />} />
      </Routes>
    </>
  )
}

root.render(
  <HashRouter>
    <RootComponent />
  </HashRouter>
)
