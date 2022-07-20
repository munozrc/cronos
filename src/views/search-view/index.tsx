import { useState } from 'react'
import { Container, Content } from '../../layouts'
import { useAppStore } from '../../stores/useAppStore'
import SearchField from './search-field'
import ToogleField from './toggle-field'
import ListItems from './list-items'
import MusicPlayer from './music-player'

import styles from './styles.module.css'

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
      <Content isLoading={queryStatus === 'loading'} isError={queryStatus === 'error'}>
        <ListItems
          items={queryResults}
          createNewDownload={() => {}}
          playAndPause={() => console.log('Play')}
        />
        <MusicPlayer />
      </Content>
    </Container>
  )
}
