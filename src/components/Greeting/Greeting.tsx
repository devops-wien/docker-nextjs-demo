import React from 'react'

type ContainerProps = {
  target?: string
}

export type Props = {
  target: string
}

export const Component: React.FC<Props> = (props) => (
  <h1 className="text-5xl text-center">
    Sep. 13, 2022 11:45 AM (UTC +02:00) - Live SKS/Terraform Demo - exoscale-acceler8-vienna, We are in <span className="text-green-600">{props.target}</span>
  </h1>
)

const Container: React.FC<ContainerProps> = (props) => {
  const target = props.target || 'local'

  return <Component target={target} />
}

Container.displayName = 'Greeting'

export default Container
