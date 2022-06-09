import { SyntheticEvent } from 'react'
import { Button } from './Button'
import { SearchIcon } from './Icons'

import styles from './SearchBar.module.css'

interface SearchBarProps {
  onSubmit: (query: string) => void
}

export const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const element = event.currentTarget[0] as HTMLInputElement
    const query = element.value.trim()
    if (query !== '') onSubmit(query)
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <input className={styles.input} name="query" placeholder="Buscar..."/>
      <Button variant='flat'>
        <SearchIcon />
      </Button>
    </form>
  )
}
