import { createSearchParams, useNavigate } from 'react-router-dom'
import { DownloadIcon, FolderIcon, SettingsIcon } from '../../components/Icons'
import { SearchBar } from '../../components/SearchBar'
import { Button } from '../../components/Button'

import styles from './styles.module.css'

export const Toolbar = () => {
  const { closeWindow, minimizeWindow, openDownloadsFolder } = window.cronos
  const navigate = useNavigate()

  const handleSubmit = (query: string) => navigate({ pathname: '/', search: `?${createSearchParams({ query })}` })
  const goToDownloadsView = () => navigate({ pathname: '/downloads' })
  const goToSettingsView = () => navigate({ pathname: '/settings' })

  return (
    <header className={styles.wrapper}>
      <div className={styles.actionsButtons}>
        <button className={styles.buttonClose} onClick={closeWindow}/>
        <button className={styles.buttonMinimize} onClick={minimizeWindow}/>
        <button className={styles.buttonMaximize} />
      </div>
      <div className={styles.branding}>
        <h1 className={styles.brandingText}>CRONOS</h1>
      </div>
      <ul className={styles.buttonList}>
        <SearchBar onSubmit={handleSubmit}/>
        <Button
          variant="flat"
          title="Configuraciones"
          icon={<SettingsIcon />}
          onClick={goToSettingsView}
        />
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
      </ul>
    </header>
  )
}
