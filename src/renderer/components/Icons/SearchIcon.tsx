import type { FC } from "react"

interface Props {
  color?: string
}

export const SearchIcon: FC<Props> = ({ color = "currentColor" }): JSX.Element => (
  <svg
    width={20}
    height={20}
    fill="none"
  >
    <path
      d="M9.167 15.833a6.667 6.667 0 1 0 0-13.333 6.667 6.667 0 0 0 0 13.333ZM17.5 17.5l-3.625-3.625"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
