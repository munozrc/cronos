import { useState } from 'react'
import { Container, Content } from '../../layouts'
import { useAppStore } from '../../stores/useAppStore'

import SearchField from './search-field'
import ToogleField from './toggle-field'
import ListItems from './list-items'
import AudioPlayer, { AudioPlayerProps } from './audio-player'

import styles from './styles.module.css'

export const SearchView = () => {
  const { queryResults, queryStatus, searchSong } = useAppStore()
  const [activeTab, setActiveTab] = useState(true)
  const [activeSong, setActiveSong] = useState<AudioPlayerProps | null>(null)

  function handleSubmit (query: string): void {
    searchSong(query)
    setActiveSong(null)
  }

  return (
    <Container>
      <div className={styles.search}>
        <SearchField onSubmit={handleSubmit}/>
        <ToogleField checked={activeTab} onChange={setActiveTab} />
      </div>
      <Content isLoading={queryStatus === 'loading'} isError={queryStatus === 'error'}>
        <ListItems
          items={queryResults}
          createNewDownload={() => {}}
          playAndPause={setActiveSong}
        />
        { activeSong && <AudioPlayer {...activeSong} />}
      </Content>
    </Container>
  )
}
