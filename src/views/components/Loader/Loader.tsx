import React from 'react'

interface Props {
  isLoading: boolean
}

const Loader: React.FC<Props> = ({ isLoading }) => {
  return <div>{isLoading ? 'Загрузка' : null}</div>
}

export default Loader
