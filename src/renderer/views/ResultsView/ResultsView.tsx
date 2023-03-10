import { useEffect, useState, type FormEvent } from "react"
import { type SearchResponse } from "@cronos/types"
import { useLocation, useRoute } from "wouter"

import { ViewContainer } from "@/layouts"
import { Button } from "@/components"
import { SongRadioButton, VideoRadioButton } from "./RadioButton"

import styles from "./ResultsView.module.css"

export const ResultsView = (): JSX.Element => {
  const [response, setResponse] = useState<SearchResponse>()
  const [, setLocation] = useLocation()
  const [, params] = useRoute("/results/:id")
  const { downloadSong, parseArtists } = window.song

  useEffect(() => {
    if (params === null || params.id === undefined) return
    if (response !== undefined) return
    console.log("fetch")
    void window.song.searchSong(params.id)
      .then(async (data) => {
        if (data.video === null && data.songs.length === 1) {
          const { title, thumbnailUrl, album, artists, id } = data.songs[0]
          void downloadSong({
            id,
            title,
            album,
            artists: await parseArtists(artists),
            thumbnailUrl
          })
          setLocation("/")
        }

        setResponse(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [response, params, downloadSong, parseArtists, setLocation])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const sourceId = form.get("song")

    const video = response?.video?.id === sourceId

    if (video && response.video !== null) {
      const { id, title } = response.video
      void downloadSong({
        id,
        title
      }).catch((e) => { console.log(e) })
    }

    const song = response?.songs.find(song => song.id === sourceId)
    if (song === undefined) return
    const { id, title, album, thumbnailUrl, artists } = song

    void downloadSong({
      id,
      title,
      album,
      artists: await parseArtists(artists),
      thumbnailUrl
    }).catch((e) => { console.log(e) })

    setLocation("/")
  }

  const handleBack = (): void => {
    setLocation("/")
  }

  if (response === undefined) {
    return <p>Cargando...</p>
  }

  if (response.video === null) {
    return <p>Error</p>
  }

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
          <VideoRadioButton {...response.video}/>
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
