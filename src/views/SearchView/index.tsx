import { useState } from 'react'
import { Container } from '../../layouts'
import { SearchField } from './searchField'

import styles from './styles.module.css'
import { ToogleField } from './toggleField'

export const SearchView = () => {
  const [filter, setFilter] = useState(true)

  const handleChange = (value:boolean) => {
    console.log({ value })
    setFilter(value)
  }

  return (
    <Container>
      <div className={styles.search}>
        <SearchField onSubmit={() => {}}/>
        <ToogleField checked={filter} onChange={handleChange} />
      </div>
    </Container>
  )
}
