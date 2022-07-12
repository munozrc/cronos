import { createSearchParams, useNavigate } from 'react-router-dom'
import { DownloadIcon, FolderIcon, SettingsIcon } from '../../components/Icons'
import { Button } from '../../components/Button'
import { SearchBar } from '../../components/SearchBar'

import styles from './styles.module.css'

export const Toolbar = () => {
  const { closeWindow, minimizeWindow, openDownloadsFolder } = window.cronos
  const navigate = useNavigate()

  return (
    <header className={styles.wrapper}>
      <div className={styles.branding}>
        <h1 className={styles.title}>CRONOS</h1>
        <p className={styles.subtitle}>Music Downloader</p>
      </div>
      <ul className={styles.buttonList}>
        <SearchBar onSubmit={(query) => navigate({ pathname: '/', search: `?${createSearchParams({ query })}` })}/>
        <Button
          variant="flat"
          title="Historial de descargas"
          icon={<DownloadIcon />}
          onClick={() => navigate({ pathname: '/downloads' })}
        />
        <Button
          variant="flat"
          title="Abrir carpeta de descargas"
          icon={<FolderIcon />}
          onClick={openDownloadsFolder}
        />
        <Button
          variant="flat"
          title="Configuraciones"
          icon={<SettingsIcon />}
          onClick={() => navigate({ pathname: '/settings' })}
        />
      </ul>
      <div className={styles.actionsButtons}>
        <button className={styles.buttonMaximize} />
        <button className={styles.buttonMinimize} onClick={minimizeWindow}/>
        <button className={styles.buttonClose} onClick={closeWindow}/>
      </div>
    </header>
  )
}
