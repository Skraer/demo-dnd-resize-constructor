import React from 'react'
import { ItemListType } from '../../../App'
// import { ItemListType } from '../CostructorPage'

import Row from './Row'
import './style.css'

interface Props {
  items: ItemListType
  onChangeItemState: (name: string, value: boolean) => void
  onSaveTemplate?: () => void
  onUseTemplate?: () => void
  onDeleteTemplate?: () => void
  onPrintStart?: () => void
  onDownloadTemplate?: () => void
  onDownloadPDF?: () => void
}

const Toolbar: React.FC<Props> = ({
  items,
  onChangeItemState,
  onSaveTemplate,
  onUseTemplate,
  onDeleteTemplate,
  onPrintStart,
  onDownloadTemplate,
  onDownloadPDF,
}) => {
  const changeHandler = (name: string) => {
    return (value: boolean) => {
      onChangeItemState(name, value)
    }
  }

  const handlers = {
    saveTemplate: () => {
      onSaveTemplate && onSaveTemplate()
    },
    useTemplate: () => {
      onUseTemplate && onUseTemplate()
    },
    deleteTemplate: () => {
      onDeleteTemplate && onDeleteTemplate()
    },
    downloadTemplate: () => {
      onDownloadTemplate && onDownloadTemplate()
    },
    printStart: () => {
      onPrintStart && onPrintStart()
    },
    downloadPDF: () => {
      onDownloadPDF && onDownloadPDF()
    },
  }

  return (
    <div className="toolbar">
      {Object.keys(items).map((itemKey) => (
        <Row
          key={itemKey}
          title={itemKey}
          name={itemKey}
          checked={items[itemKey].selected}
          onChange={changeHandler(itemKey)}
        />
      ))}

      <div className="toolbar-row">
        <button onClick={handlers.saveTemplate} className="btn">
          Сохранить шаблон в local storage
        </button>
        <button onClick={handlers.useTemplate} className="btn">
          Использовать шаблон из local storage
        </button>
      </div>

      <div className="toolbar-row">
        <button onClick={handlers.deleteTemplate}>
          Удалить шаблон из local storage
        </button>
      </div>

      <div className="toolbar-row">
        <button onClick={handlers.downloadTemplate}>Скачать шаблон</button>
      </div>

      <div className="toolbar-row">
        <button onClick={handlers.printStart}>Печать</button>
      </div>

      <div className="toolbar-row">
        <button onClick={handlers.downloadPDF}>Скачать PDF</button>
      </div>
    </div>
  )
}

export default Toolbar
