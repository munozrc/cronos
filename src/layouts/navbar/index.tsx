import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'

const isActive = ({ isActive }: any) => isActive ? styles.linkActive : styles.link

export function Navbar () {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>CRONOS</h1>
      <nav className={styles.navbar}>
        <NavLink to="/" className={isActive}>Buscar</NavLink>
        <NavLink to="/downloads" className={isActive}>Descargas</NavLink>
        <NavLink to="/settings" className={isActive}>Preferencias</NavLink>
      </nav>
      <div className={styles.windowButtons}>
        <button className={styles.btnMaximize}/>
        <button className={styles.btnMinimize}/>
        <button className={styles.btnClose}/>
      </div>
    </header>
  )
}
