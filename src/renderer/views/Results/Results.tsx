import { useEffect, useState, type FormEvent } from "react"
import { type SearchResponse } from "@cronos/types"

import { ViewContainer } from "@/layouts"
import { Button } from "@/components"
import { SongRadioButton, VideoRadioButton } from "./RadioButton"

import styles from "./Results.module.css"
import { useLocation } from "@/hooks"

export const ResultsView: React.FC = () => {
  const [response, setResponse] = useState<SearchResponse>()
  const [params, changeView] = useLocation<{ id: string }>()

  useEffect(() => {
    const { parseArtists, downloadSong, searchSong } = window.song
    const { id } = params
    console.log("Fetching data....")

    void searchSong(id)
      .then(async ({ video, songs }) => {
        if (video !== null || songs.length < 1) {
          setResponse({ video, songs })
          return
        }

        const { title, thumbnailUrl, album, artists, id } = songs[0]
        void downloadSong({
          id,
          title,
          album,
          artists: await parseArtists(artists),
          thumbnailUrl
        })

        changeView("/")
      })
      .catch((e) => { console.log(e) })
  }, [params, changeView])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const sourceId = form.get("song")

    const video = response?.video?.id === sourceId

    if (video && response.video !== null) {
      const { id, title } = response.video
      void window.song.downloadSong({
        id,
        title
      }).catch((e) => { console.log(e) })
    }

    const song = response?.songs.find(song => song.id === sourceId)
    if (song === undefined) return
    const { id, title, album, thumbnailUrl, artists } = song

    void window.song.downloadSong({
      id,
      title,
      album,
      artists: await window.song.parseArtists(artists),
      thumbnailUrl
    }).catch((e) => { console.log(e) })

    changeView("/")
  }

  const handleBack = (): void => {
    changeView("/")
  }

  if (response === undefined) {
    return <p>Cargando...</p>
  }

  if (response.video === null) return null

  return (
    <ViewContainer className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.title}>Resultados</h3>
        <p className={styles.description}>Selecciona una de las opciones.</p>
      </header>
      <form
        onSubmit={(e) => { void handleSubmit(e) }}
        className={styles.form}
      >
        <div className={styles.videoContainer}>
          <VideoRadioButton {...response?.video}/>
        </div>
        <div className={styles.songsContainer}>
          {response.songs.map((song) => (
            <SongRadioButton
              key={song.id}
              {...song}
            />
          ))}
        </div>
        <div className={styles.btnContainer}>
          <Button
            className={styles.secondary}
            onClick={handleBack}
          >
            Atras
          </Button>
          <Button
            className={styles.primary}
            type="submit"
          >
            Descargar
          </Button>
        </div>
      </form>
    </ViewContainer>
  )
}
