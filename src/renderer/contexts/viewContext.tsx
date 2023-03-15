import { createContext, useState, type FC, type ReactNode } from "react"

interface View {
  path: string
  params: object
}

interface ViewContextValues {
  currentView: View
  setCurrentView: React.Dispatch<React.SetStateAction<View>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const ViewContext = createContext<ViewContextValues>({} as ViewContextValues)

interface ViewProviderProps {
  children: ReactNode
}

export const ViewProvider: FC<ViewProviderProps> = ({ children }) => {
  const [currentView, setCurrentView] = useState<View>({
    path: "/",
    params: {}
  })

  return (
    <ViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </ViewContext.Provider>
  )
}
