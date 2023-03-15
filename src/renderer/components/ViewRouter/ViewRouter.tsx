import { Children, isValidElement } from "react"
import { type RouteProps } from "./Route"
import { useViewRouter } from "@/hooks"

interface ViewRouterProps {
  children: React.ReactNode
}

export const ViewRouter: React.FC<ViewRouterProps> = ({ children }) => {
  const currentView = useViewRouter()

  const routesFromChildren = Children.map(children, (child) => {
    if (!isValidElement<RouteProps>(child)) return null
    return child.props
  })

  const ViewComponent = routesFromChildren?.find((route) => {
    return route.path === currentView
  })?.component

  return typeof ViewComponent !== "undefined"
    ? <ViewComponent />
    : null
}
