import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"

import "./index.css"

const elementRoot = document.getElementById("root") as HTMLElement
const root = ReactDOM.createRoot(elementRoot)

root.render(<App />)
