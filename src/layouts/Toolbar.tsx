import { createSearchParams, useNavigate } from 'react-router-dom'
import { DownloadIcon, FolderIcon, SettingsIcon } from '../components/Icons'
import { SearchBar } from '../components/SearchBar'
import { Button } from '../components/Button'

import styles from './Toolbar.module.css'

export const Toolbar = () => {
  const navigate = useNavigate()
  const { closeWindow, minimizeWindow, openDownloadsFolder } = window.cronos
  const handleSubmit = (query: string) => navigate({ pathname: '/', search: `?${createSearchParams({ query })}` })
  const goToDownloadsView = () => navigate({ pathname: '/downloads' })

  return (
    <header className={styles.header}>
      <div className={styles.buttonGruop}>
        <button className={styles.buttonClose} onClick={closeWindow}/>
        <button className={styles.buttonMinimize} onClick={minimizeWindow}/>
        <button className={styles.buttonMaximize} />
      </div>
      <div className={styles.brand}>
        <h1 className={styles.title}>CRONOS</h1>
      </div>
      <ul className={styles.listItems}>
        <SearchBar onSubmit={handleSubmit}/>
        <Button
          variant="flat"
          title="Abrir carpeta de descargas"
          icon={<FolderIcon />}
          onClick={openDownloadsFolder}
        />
        <Button
          variant="flat"
          title="Historial de descargas"
          icon={<DownloadIcon />}
          onClick={goToDownloadsView}
        />
        <Button
          variant="flat"
          title="Configuraciones"
          icon={<SettingsIcon />}
        />
      </ul>
    </header>
  )
}
