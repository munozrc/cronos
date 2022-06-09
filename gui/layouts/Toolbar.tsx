import { createSearchParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { DownloadIcon, FolderIcon, SettingsIcon } from '../components/Icons'
import { SearchBar } from '../components/SearchBar'

import styles from './Toolbar.module.css'

export const Toolbar = () => {
  const navigate = useNavigate()
  const handleSubmit = (query: string) => navigate({ pathname: '/', search: `?${createSearchParams({ query })}` })
  return (
    <header className={styles.header}>
      <div className={styles.buttonGruop}>
        <button className={styles.buttonClose} onClick={window.cronos.closeWindow}/>
        <button className={styles.buttonMinimize} onClick={window.cronos.minimizeWindow}/>
        <button className={styles.buttonMaximize} />
      </div>
      <div className={styles.brand}>
        <h1 className={styles.title}>CRONOS</h1>
      </div>
      <ul className={styles.listItems}>
        <SearchBar onSubmit={handleSubmit}/>
        <Button variant="flat">
          <FolderIcon />
        </Button>
        <Button variant="flat">
          <DownloadIcon />
        </Button>
        <Button variant="flat">
          <SettingsIcon />
        </Button>
      </ul>
    </header>
  )
}
