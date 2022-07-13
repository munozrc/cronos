import { FormEvent } from 'react'
import { Button } from '../../components/Button'
import { SearchIcon } from '../../components/Icons'
import { useAppStore } from '../../stores/useAppStore'

import styles from './styles.module.css'

export const Searchbar = () => {
  const { searchSong } = useAppStore()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const search = formData.get('search') as string
    search && searchSong(search.trim())
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <input className={styles.input} name="search" placeholder="Buscar..."/>
      <Button variant='flat' icon={<SearchIcon />}/>
    </form>
  )
}
