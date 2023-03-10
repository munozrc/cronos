import { type FC } from "react"
import { MinimizeIcon, CloseIcon } from "@/components/Icons"
import { FrameButton } from "./FrameButton"
import styles from "./Frame.module.css"

interface Props {
  appName: string
}

export const Frame: FC<Props> = ({ appName }) => {
  return (
    <header className={styles.container}>
      <div className={styles.titleContainer}>
        <h4 className={styles.title}>{appName}</h4>
      </div>
      <div className={styles.buttonGroup}>
        <FrameButton
          variant="secondary"
          onAction={window.windowFrame.minimize}
        >
          <MinimizeIcon />
        </FrameButton>
        <FrameButton
          variant="primary"
          onAction={window.windowFrame.close}
        >
          <CloseIcon />
        </FrameButton>
      </div>
    </header>
  )
}
