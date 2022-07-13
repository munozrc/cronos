import { ReactNode, useEffect } from 'react'
import { useDownloadStore } from '../../stores/useDownloadStore'

interface RootContainerProps {
  children: ReactNode | Array<ReactNode>
}

export const RootContainer = ({ children }: RootContainerProps) => {
  const { onDownloadCompleted } = window.cronos
  const { updateItemList } = useDownloadStore()

  useEffect(() => {
    onDownloadCompleted(updateItemList)
  }, [onDownloadCompleted, updateItemList])

  return <>{children}</>
}
