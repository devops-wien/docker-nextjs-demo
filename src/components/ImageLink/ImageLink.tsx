import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export interface Props {
  imageSrc: string
  href: string
}

export const ImageLink: FC<Props> = ({ imageSrc, href }) => {
  return (
    <Link href={href} className="relative">
      <a>
        <Image src={imageSrc} layout="responsive" width="100px" height="50px" />
      </a>
    </Link>
  )
}

export default ImageLink
