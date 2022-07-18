import { useState } from 'react'
import { Container } from '../../layouts'
import { useAppStore } from '../../stores/useAppStore'
import { SearchField } from './searchField'
import { ToogleField } from './toggleField'

import styles from './styles.module.css'
import { Spinner } from '../../components/Spinner'
import { ListItems } from './listItems'

export const SearchView = () => {
  const { queryResults, queryStatus, searchSong } = useAppStore()
  const [filter, setFilter] = useState(true)

  const handleChange = (value:boolean) => {
    console.log({ value })
    setFilter(value)
  }

  return (
    <Container>
      <div className={styles.search}>
        <SearchField onSubmit={searchSong}/>
        <ToogleField checked={filter} onChange={handleChange} />
      </div>
      { queryStatus === 'loading' && <Spinner /> }
      { queryStatus === 'complete' && (
        <ListItems
          items={queryResults}
          createNewDownload={() => {}}
        />
      )}
    </Container>
  )
}
