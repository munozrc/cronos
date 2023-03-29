import { type FormEvent } from "react"
import { useLocation, useSingleSong, useSong } from "@/hooks"
import { SongRadioButton, VideoRadioButton } from "./RadioButton"
import { ViewContainer } from "@/layouts"
import { Button } from "@/components"

import styles from "./Results.module.css"

export const ResultsView: React.FC = () => {
  const [, changeView] = useLocation()
  const { downloadSong } = useSingleSong()
  const { isLoading, video, songs } = useSong()

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const sourceId = form.get("song")

    const id = video?.id === sourceId
    const isVideoDownload = id && video !== null
    const song = songs?.find(s => s.id === sourceId)

    if (isVideoDownload) {
      void downloadSong(video)
      changeView("/")
      return
    }

    if (song === undefined) return
    void downloadSong(song)
    changeView("/")
  }

  const handleBack = (): void => {
    changeView("/")
  }

  if (isLoading) {
    return <p>Cargando...</p>
  }

  if (video === null || typeof video === "undefined") return null

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
          <VideoRadioButton {...video} />
        </div>
        <div className={styles.songsContainer}>
          {songs?.map((song) => (
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
