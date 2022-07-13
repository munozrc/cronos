import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'

import { Footer, Toolbar, RootContainer } from './layouts'
import { DownloadView, SearchView, SettingsView } from './views'

import './main.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <RootContainer>
    <HashRouter>
      <Toolbar />
      <Routes>
        <Route path="/" element={<SearchView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/downloads" element={<DownloadView />} />
      </Routes>
      <Footer />
    </HashRouter>
  </RootContainer>
)
