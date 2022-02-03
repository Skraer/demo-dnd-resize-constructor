import React, { useEffect, useRef, useState } from 'react'
import './style.css'

interface Props {
  checked: boolean
  title: string
  onChange: (state: boolean) => void
  name: string
}

const Row: React.FC<Props> = ({ onChange, title, name, checked }) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <div className="toolbar-row">
      <div className="toolbar-row__title">{title}</div>
      <div className="toolbar-row__checkbox">
        <input
          // ref={inputRef}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={changeHandler}
        />
      </div>
    </div>
  )
}

export default Row
