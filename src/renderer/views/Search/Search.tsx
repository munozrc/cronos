import { type FormEvent } from "react"
import { Input, SearchIcon } from "@/components"
import { ViewContainer } from "@/layouts"
import styles from "./SearchView.module.css"
import { useLocation } from "wouter"

type VideoLink = string | null

export const SearchView = (): JSX.Element => {
  const [, setLocation] = useLocation()
  const { getVideoID } = window.video

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const videoLink = formData.get("video-link") as VideoLink
    const isEmpty = videoLink === null || videoLink.length <= 0

    if (isEmpty) return

    getVideoID(videoLink)
      .then(id => {
        setLocation("/results/" + id)
      })
      .catch((e) => {
        console.log({ e })
      })
  }

  return (
    <ViewContainer className={styles.container}>
      <section className={styles.hero}>
        <h2 className={styles.title}>Music Downloader</h2>
        <p className={styles.description}>Descarga musica de forma gratuita en formato MP3</p>
      </section>
      <form
        className={styles.search}
        onSubmit={handleSubmit}
      >
        <SearchIcon
          color="#70747A"
        />
        <Input
          name="video-link"
          className={styles.input}
          placeholder="https://www.youtube.com/watch?v=T0T9GyM28tg"
        />
      </form>
    </ViewContainer>
  )
}
