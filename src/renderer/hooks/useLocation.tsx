import { ViewContext } from "@/contexts/viewContext"
import { useCallback, useContext } from "react"

type ReturnType<T> = [T, (path: string, params?: object) => void]

export function useLocation<T> (): ReturnType<T> {
  const { currentView, setCurrentView } = useContext(ViewContext)

  const changeView = useCallback((path: string, params: object | undefined = {}): void => {
    setCurrentView(() => ({
      path,
      params
    }))
  }, [setCurrentView])

  return [
    currentView.params as T,
    changeView
  ]
}
