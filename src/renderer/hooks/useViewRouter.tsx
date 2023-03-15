import { ViewContext } from "@/contexts/viewContext"
import { useContext } from "react"

export function useViewRouter (): string {
  const { currentView } = useContext(ViewContext)
  return currentView.path
}
