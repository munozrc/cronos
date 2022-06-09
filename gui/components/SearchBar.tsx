import { Button } from './Button'
import { SearchIcon } from './Icons'
import styles from './SearchBar.module.css'

export const SearchBar = () => {
  return (
    <form className={styles.wrapper}>
      <input className={styles.input}/>
      <Button variant='flat'>
        <SearchIcon />
      </Button>
    </form>
  )
}
