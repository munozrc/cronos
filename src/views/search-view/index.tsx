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
      <Content
        isLoading={queryStatus === 'loading'}
        isError={queryStatus === 'error'}
        isHidden={!activeTab}
      >
        <ListItems
          items={queryResults}
          createNewDownload={() => {}}
          playAndPause={setActiveSong}
        />
        { activeSong && <AudioPlayer {...activeSong} />}
      </Content>
      <Content
        isLoading={suggestionStatus === 'loading'}
        isError={suggestionStatus === 'error'}
        isHidden={activeTab}
      >
        <ListItems
          items={suggestionResults}
          createNewDownload={() => {}}
          playAndPause={setActiveSong}
        />
        { activeSong && <AudioPlayer {...activeSong} />}
      </Content>
    </Container>
  )
}
