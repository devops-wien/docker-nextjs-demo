import React from 'react'

type ContainerProps = {
  target?: string
}

export type Props = {
  target: string
}

export const Component: React.FC<Props> = (props) => (
  <h1 className="text-5xl text-center">
    18.02.2022, 11:52 test - Hello, from Next.js, We are in <span className="text-green-600">{props.target}</span>
  </h1>
)

const Container: React.FC<ContainerProps> = (props) => {
  const target = props.target || 'local'

  return <Component target={target} />
}

Container.displayName = 'Greeting'

export default Container
