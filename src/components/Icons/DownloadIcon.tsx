import { SVGProps } from 'react'

export const DownloadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 11.75v-9m0 9-3-3m3 3 3-3m-10.5 4.5.466 1.864A1.5 1.5 0 0 0 3.42 16.25h11.158a1.5 1.5 0 0 0 1.455-1.136l.466-1.864"
      stroke="#4B4B4B"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
