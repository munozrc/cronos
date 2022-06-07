import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'

import { Toolbar } from './layouts'
import { SearchView } from './views'
import './main.css'

const root = ReactDOM.createRoot(
  document.getElementById('root')!
)

root.render(
  <React.StrictMode>
    <HashRouter>
      <Toolbar />
      <Routes>
        <Route path="/" element={<SearchView />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
