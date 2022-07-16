import { Link } from 'react-router-dom'
import { DownloadIcon, FolderIcon, SearchIcon, SettingsIcon } from '../../components/Icons'

import styles from './Sidebar.module.css'

export const Sidebar = () => (
  <nav className={styles.container}>
    <Link to="/" className={styles.itemLink}>
      <SearchIcon height="23px" width="23px" />
    </Link>
    <Link to="/downloads" className={styles.itemLink}>
      <DownloadIcon height="24px" width="24px" />
    </Link>
    <Link to="/" className={styles.itemLink}>
      <FolderIcon height="22px" width="22px" />
    </Link>
    <Link to="/settings" className={styles.itemLink}>
      <SettingsIcon height="22px" width="22px" />
    </Link>
  </nav>
)
