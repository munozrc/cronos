import { ViewContext } from "@/contexts"
import { useContext } from "react"

export function useViewRouter (): string {
  const { currentView } = useContext(ViewContext)
  return currentView.path
}
