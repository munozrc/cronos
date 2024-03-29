import { type FormEvent } from "react"
import { Input, SearchIcon } from "@/components"
import { ViewContainer } from "@/layouts"

import styles from "./Search.module.css"
import { useLocation } from "@/hooks"

export const SearchView = (): JSX.Element => {
  const [, changeView] = useLocation()

  const handleChangeView = async (link: string): Promise<void> => {
    const id = await window.video.getID(link)
    changeView("/results", { id })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const link = formData.get("video-link") as string | null
    if (link === null || link.length <= 0) return
    void handleChangeView(link)
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
