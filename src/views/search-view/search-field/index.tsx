import { FormEvent, useEffect, useRef, useState } from 'react'
import { CloseIcon, SearchIcon } from '../../../Icons'

import styles from './styles.module.css'

interface SearchFieldProps {
  initialValue?: string
  onSubmit: (query: string) => void
  onClearSearch: () => void
}

const SearchField = ({ initialValue = '', onSubmit, onClearSearch }: SearchFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.value = initialValue
    initialValue.length === 0 ? setHidden(true) : setHidden(false)
  }, [initialValue])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const search = formData.get('search') as string
    search && onSubmit(search)
  }

  const handleClearInput = () => {
    if (!inputRef.current) return
    inputRef.current.value = ''
    onClearSearch()
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        onChange={({ currentTarget }) => currentTarget.value.length === 0 ? setHidden(true) : setHidden(false)}
        name="search"
        placeholder="Busca por canción o artista"
      />
      <button
        type="button"
        className={styles.btnClear}
        style={{ visibility: hidden ? 'hidden' : 'visible' }}
        onClick={handleClearInput}
      >
        <CloseIcon />
      </button>
      <button type="submit" className={styles.btnSearch}>
        <SearchIcon width="20px" height="20px" />
      </button>
    </form>
  )
}

export default SearchField
