import { Button } from '../components/Button'
import { DownloadIcon, SearchIcon } from '../components/Icons'

import styles from './Toolbar.module.css'

export const Toolbar = () => {
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
        <Button variant="flat">
          <SearchIcon />
        </Button>
        <Button variant="flat">
          <DownloadIcon />
        </Button>
      </ul>
    </header>
  )
}
