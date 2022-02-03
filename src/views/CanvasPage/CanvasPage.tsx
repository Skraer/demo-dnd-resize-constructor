import React, { useEffect, useRef, useState } from 'react'
import { ItemListType, ItemType } from '../../App'
import Toolbar from '../components/Toolbar/Toolbar'
import Editor from './Editor'
import './style.css'

interface Props {
  items: ItemListType
  onItemsChange: (items: ItemListType) => void
}

const CanvasPage: React.FC<Props> = ({ items, onItemsChange }) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [editorSize, setEditorSize] = useState({ height: null, width: null })

  useEffect(() => {
    if (editorRef.current) {
      const rect = editorRef.current.getBoundingClientRect()

      setEditorSize({
        height: Math.floor(rect.height),
        width: Math.floor(rect.width),
      })
    }
  }, [editorRef.current])

  const changeItemState = (name: string, value: boolean) => {
    const newItems = {
      ...items,
      [name]: {
        ...items[name],
        selected: value,
      },
    }
    onItemsChange(newItems)
  }

  const changeItemPosition = (
    fieldName: string,
    position: { x: number; y: number }
  ) => {
    // const newItems: ItemListType = {
    //   ...items,
    //   [fieldName]: {
    //     ...items[fieldName],
    //     selected: items[fieldName].selected,
    //     position: { ...position },
    //   },
    // }
    // console.log(newItems[fieldName])
    // onItemsChange(newItems)
  }

  const printStart = () => {}

  return (
    <div className="canvas-page">
      <h1>Канвас форма</h1>
      <div className="canvas-page__inner">
        {/* <Template
          ref={templateRef}
          items={getSelectedItems(items)}
          onPositionChange={changeItemPosition}
        /> */}
        <Editor
          items={items}
          ref={editorRef}
          key="editor"
          height={editorSize.height}
          width={editorSize.width}
          onPositionChange={changeItemPosition}
        />
        <Toolbar
          onChangeItemState={changeItemState}
          items={items}
          // onSaveTemplate={saveTemplate}
          // onUseTemplate={useTemplate}
          // onDeleteTemplate={deleteTemplate}
          onPrintStart={printStart}
          // onDownloadTemplate={downloadTemplate}
          // onDownloadPDF={downloadPDF}
        />
      </div>
    </div>
  )
}

export default CanvasPage
