import { useState } from 'react'
import { Container, Content } from '../../layouts'
import { useAppStore } from '../../stores/useAppStore'

import SearchField from './search-field'
import ToogleField from './toggle-field'
import ListItems from './list-items'
import AudioPlayer, { AudioPlayerProps } from './audio-player'

import styles from './styles.module.css'

export const SearchView = () => {
  const {
    queryResults,
    queryStatus,
    suggestionResults,
    suggestionStatus,
    searchSong,
    searchTrackSuggestions
  } = useAppStore()

  const [activeTab, setActiveTab] = useState(true)
  const [activeSong, setActiveSong] = useState<AudioPlayerProps | null>(null)

  const loading = queryStatus === 'loading' || suggestionStatus === 'loading'
  const error = queryStatus === 'error' || suggestionStatus === 'error'

  function handleSubmit (query: string): void {
    setActiveSong(null)
    setActiveTab(true)
    searchSong(query)
  }

  function handleChangeTab (value: boolean): void {
    !value && searchTrackSuggestions()
    setActiveTab(value)
  }

  return (
    <Container>
      <div className={styles.search}>
        <SearchField onSubmit={handleSubmit}/>
        <ToogleField checked={activeTab} onChange={handleChangeTab} />
      </div>
      <Content isLoading={loading} isError={error}>
        <ListItems
          items={queryResults}
          hidden={!activeTab}
          createNewDownload={() => {}}
          playAndPause={setActiveSong}
        />
        <ListItems
          items={suggestionResults}
          hidden={activeTab}
          createNewDownload={() => {}}
          playAndPause={setActiveSong}
        />
        { activeSong && <AudioPlayer {...activeSong} />}
      </Content>
    </Container>
  )
}
