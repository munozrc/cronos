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
        <li className={styles.item}><SearchIcon /></li>
        <li className={styles.item}><DownloadIcon /></li>
      </ul>
    </header>
  )
}
