import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import CostructorPage from './views/Constructor/CostructorPage' // ItemListType,
import { ControlPosition } from 'react-draggable'
import CanvasPage from './views/CanvasPage/CanvasPage'

export type ItemType = {
  selected: boolean
  content: string
  position: ControlPosition
}

export type ItemListType = {
  [key: string]: ItemType
}

const values: ItemListType = {
  someText1: {
    selected: false,
    content: 'Enim Lorem commodo nisi duis anim reprehenderit.',
    position: {
      x: 0,
      y: 0,
    },
  },
  someText2: {
    selected: false,
    content: 'Lorem qui deserunt id aliqua Lorem ea occaecat in nulla.',
    position: {
      x: 0,
      y: 0,
    },
  },
  someText3: {
    selected: false,
    content: 'Sint ea minim nulla nostrud qui elit duis esse sint occaecat.',
    position: {
      x: 0,
      y: 0,
    },
  },
  someText4: {
    selected: false,
    content:
      'Mollit id voluptate qui consequat dolore non commodo cillum nisi amet eiusmod nulla anim anim.',
    position: {
      x: 0,
      y: 0,
    },
  },
  someText5: {
    selected: false,
    content:
      'Aliquip non eiusmod fugiat exercitation officia cupidatat fugiat.',
    position: {
      x: 0,
      y: 0,
    },
  },
}

function App() {
  const [items, setItems] = useState<ItemListType>({
    ...values,
  })

  const changeItems = (items: ItemListType) => {
    // console.log(items)
    setItems(items)
  }

  const onPrintStart = (items: ItemListType) => {}

  return (
    <div className="App">
      {/* <CanvasPage items={items} onItemsChange={changeItems} /> */}
      <CostructorPage items={items} onItemsChange={setItems} />
    </div>
  )
}

export default App
