import { FormEvent } from 'react'
import { SearchIcon } from '../../../components/Icons'

import styles from './styles.module.css'

interface SearchFieldProps {
  onSubmit: (query: string) => void
}

export const SearchField = ({ onSubmit }: SearchFieldProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const search = formData.get('search') as string
    search && onSubmit(search)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        name="search"
        placeholder="Busca por canción o artista"
      />
      <button type="submit" className={styles.btnSearch}>
        <SearchIcon width="20px" height="20px" />
      </button>
    </form>
  )
}
