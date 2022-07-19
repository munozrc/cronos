import { ImgHTMLAttributes, useState } from 'react'

interface Props extends ImgHTMLAttributes<any> {
  fallback: string
}

export default function Image ({ fallback, src, alt, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src)
  const onError = () => setImgSrc(fallback)

  return <img src={imgSrc || fallback} onError={onError} alt={alt}{...props} />
}
