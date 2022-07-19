import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { DownloadView, SearchView, SettingsView } from './views'
import { Navbar, Statusbar, Wrapper } from './layouts'

import './main.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <Wrapper>
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/downloads" element={<DownloadView />} />
      </Routes>
      <Statusbar />
    </HashRouter>
  </Wrapper>
)
