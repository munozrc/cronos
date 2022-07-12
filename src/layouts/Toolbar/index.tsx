import styles from './styles.module.css'

export const Toolbar = () => {
  const { closeWindow, minimizeWindow } = window.cronos
  return (
    <header className={styles.wrapper}>
      <div className={styles.branding}>
        <h1 className={styles.title}>CRONOS</h1>
        <p className={styles.subtitle}>Music Downloader</p>
      </div>
      <div className={styles.actionsButtons}>
        <button className={styles.buttonMaximize} />
        <button className={styles.buttonMinimize} onClick={minimizeWindow}/>
        <button className={styles.buttonClose} onClick={closeWindow}/>
      </div>
    </header>
  )
}
