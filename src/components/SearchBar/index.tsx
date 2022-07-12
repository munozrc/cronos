import { FormEvent } from 'react'
import { Button } from '../Button'
import { SearchIcon } from '../Icons'

import styles from './styles.module.css'

interface SearchBarProps {
  onSubmit: (query: string) => void
}

export const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const search = formData.get('search') as string
    search && onSubmit(search)
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <input className={styles.input} name="search" placeholder="Buscar..."/>
      <Button variant='flat' icon={<SearchIcon />}/>
    </form>
  )
}
