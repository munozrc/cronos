import styles from './styles.module.css'

export const Toolbar = () => {
  const { closeWindow, minimizeWindow } = window.cronos
  return (
    <header className={styles.container}>
      <h1 className={styles.logo}>CRONOS</h1>
      <p className={styles.subtitle}>Music Downloader</p>
      <div className={styles.buttons}>
        <button className={styles.btnMaximize} />
        <button className={styles.btnMinimize} onClick={minimizeWindow}/>
        <button className={styles.btnClose} onClick={closeWindow}/>
      </div>
    </header>
  )
}
