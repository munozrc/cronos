import { type FC, type ComponentType } from "react"

export interface RouteProps {
  path: string
  component: ComponentType
}

export const Route: FC<RouteProps> = (props: RouteProps) => null
