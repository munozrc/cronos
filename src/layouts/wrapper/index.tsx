import { ReactNode, useEffect } from 'react'
import { useDownloadStore } from '../../stores/useDownloadStore'

interface WrapperProps {
  children: ReactNode | Array<ReactNode>
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { onDownloadCompleted } = window.cronos
  const { updateItemList } = useDownloadStore()

  useEffect(() => {
    onDownloadCompleted(updateItemList)
  }, [onDownloadCompleted, updateItemList])

  return <>{children}</>
}
