import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'

import { Toolbar } from './layouts'
import { DownloadsView, SearchView } from './views'

import './main.css'

const root = ReactDOM.createRoot(
  document.getElementById('root')!
)

root.render(
  <HashRouter>
    <Toolbar />
    <Routes>
      <Route path="/" element={<SearchView />} />
      <Route path="/downloads" element={<DownloadsView />} />
    </Routes>
  </HashRouter>
)
