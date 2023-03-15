import ReactDOM from "react-dom/client"
import { Route, ViewRouter } from "@/components/ViewRouter"
import { ResultsView, SearchView } from "@/views"
import { ViewProvider } from "@/contexts"
import { Frame } from "@/layouts"

import "@/index.css"

const elementRoot = document.getElementById("root") as HTMLElement
const root = ReactDOM.createRoot(elementRoot)

root.render(
  <ViewProvider>
    <Frame appName="cronos" />
    <ViewRouter>
      <Route path="/results" component={ResultsView}/>
      <Route path="/" component={SearchView}/>
    </ViewRouter>
  </ViewProvider>
)
