import { useState } from 'react'
import { Container, Content } from '../../layouts'
import { useAppStore } from '../../stores/useAppStore'

import SearchField from './search-field'
import ToogleField from './toggle-field'
import ListItems from './list-items'
import AudioPlayer from './audio-player'

import { useDownloadStore } from '../../stores/useDownloadStore'
import { AudioPlayerSong } from '../../types'

import styles from './styles.module.css'

export const SearchView = () => {
  const {
    query,
    queryResults,
    queryStatus,
    suggestionResults,
    suggestionStatus,
    searchSong,
    searchTrackSuggestions,
    clearSearch
  } = useAppStore()

  const { createNewDownload } = useDownloadStore()

  const [tab, setTab] = useState<boolean>(true)
  const [song, setSong] = useState<AudioPlayerSong | null>(null)
  const [playing, setPlaying] = useState<boolean>(false)

  const loading = queryStatus === 'loading' || suggestionStatus === 'loading'
  const error = queryStatus === 'error' || suggestionStatus === 'error'

  function handleSubmit (query: string): void {
    setSong(null)
    setTab(true)
    searchSong(query)
  }

  function handleChangeTab (value: boolean): void {
    !value && searchTrackSuggestions()
    setTab(value)
  }

  return (
    <Container>
      <div className={styles.search}>
        <SearchField
          initialValue={query}
          onSubmit={handleSubmit}
          onClearSearch={clearSearch}
        />
        <ToogleField
          checked={tab}
          onChange={handleChangeTab}
        />
      </div>
      <Content isLoading={loading} isError={error}>
        <ListItems
          items={queryResults}
          hidden={!tab}
          idActiveSong={song?.id}
          isPlayingSong={playing}
          onSetSong={setSong}
          togglePlaySong={setPlaying}
          createNewDownload={createNewDownload}
        />
        <ListItems
          items={suggestionResults}
          hidden={tab}
          idActiveSong={song?.id}
          isPlayingSong={playing}
          onSetSong={setSong}
          togglePlaySong={setPlaying}
          createNewDownload={createNewDownload}
        />
        { song && <AudioPlayer song={song} playing={playing} onPlaying={setPlaying} />}
      </Content>
    </Container>
  )
}
