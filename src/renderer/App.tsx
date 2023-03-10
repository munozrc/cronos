import { Route, Router } from "wouter"
import { Frame } from "./layouts/Frame"
import { ResultsView, SearchView } from "./views"

export const App = (): JSX.Element => {
  return (
    <>
      <Frame appName="cronos" />
      <Router>
        <Route path="/results/:id" component={ResultsView}/>
        <Route path="/" component={SearchView}/>
      </Router>
    </>
  )
}
