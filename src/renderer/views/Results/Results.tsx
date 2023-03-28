import { useEffect, useState, type FormEvent } from "react"
import { type SearchResponse } from "@cronos/types"

import { ViewContainer } from "@/layouts"
import { Button } from "@/components"
import { SongRadioButton, VideoRadioButton } from "./RadioButton"

import styles from "./Results.module.css"
import { useLocation } from "@/hooks"
import { useSong } from "@/hooks/useSong"

export const ResultsView: React.FC = () => {
  const [response, setResponse] = useState<SearchResponse>()
  const [params, changeView] = useLocation<{ id: string }>()
  const { downloadSong, isDirectDownload } = useSong()

  useEffect(() => {
    const { id } = params
    console.log("Fetching data....")

    void window.song.search(id)
      .then((res) => {
        const { video, songs } = res
        if (isDirectDownload(res)) {
          void downloadSong(songs[0])
          changeView("/")
          return
        }
        setResponse({ video, songs })
      })
      .catch((e) => { console.log(e) })
  }, [params, changeView, downloadSong, isDirectDownload])

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const sourceId = form.get("song")
    const video = response?.video?.id === sourceId

    if (video && response.video !== null) {
      void downloadSong(response.video)
      changeView("/")
      return
    }

    const song = response?.songs.find(song => song.id === sourceId)
    if (song === undefined) return
    void downloadSong(song)
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
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <div className={styles.videoContainer}>
          <VideoRadioButton {...response.video} />
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
