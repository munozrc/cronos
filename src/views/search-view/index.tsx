import { useState } from 'react'
import { Container, Content } from '../../layouts'
import { useAppStore } from '../../stores/useAppStore'
import SearchField from './search-field'
import ToogleField from './toggle-field'
import ListItems from './list-items'
import MusicPlayer from './music-player'

import styles from './styles.module.css'
import { Track } from '../../../electron/types'

export const SearchView = () => {
  const { queryResults, queryStatus, searchSong } = useAppStore()
  const [filter, setFilter] = useState(true)
  const [activeSong, setActiveSong] = useState<Track | null>(null)

  const handleChange = async (value:boolean) => {
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
          playAndPause={setActiveSong}
        />
        { activeSong && <MusicPlayer {...activeSong} />}
      </Content>
    </Container>
  )
}
