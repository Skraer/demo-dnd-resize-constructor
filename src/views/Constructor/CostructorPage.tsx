import React, { Component, useRef, useState } from 'react'
import { useEffect } from 'react'
import Header from './Header/Header'
import Template from './Template/Template'
import Toolbar from '../components/Toolbar/Toolbar'
// import Draggable from 'react-draggable'

import html2canvas from 'html2canvas'

import { jsPDF } from 'jspdf'

import './style.css'
import { ControlPosition } from 'react-draggable'
import { ItemListType } from '../../App'

interface Props {
  items: ItemListType
  onItemsChange: (items: ItemListType) => void
}

const CostructorPage: React.FC<Props> = ({ items, onItemsChange }) => {
  const templateRef = useRef<HTMLDivElement>(null)

  const changeItemState = (name: string, value: boolean) => {
    const newItems = {
      ...items,
      [name]: {
        ...items[name],
        selected: value,
      },
    }

    console.log(newItems)

    onItemsChange(newItems)
  }

  const saveTemplate = () => {
    localStorage.setItem('template', JSON.stringify(items))
    alert('Шаблон успешно сохранен')
  }

  const useTemplate = () => {
    const template = localStorage.getItem('template')
    if (template) {
      onItemsChange(JSON.parse(template))
      // setItems(JSON.parse(template))
      alert('Шаблон успешно применен')
    } else {
      alert('Нет сохраненного шаблона (')
    }
  }

  const downloadTemplate = () => {
    const template = JSON.stringify(items)
    const link = document.createElement('a')
    // link.setAttribute('download', 'template.json')

    const file = new Blob([template], { type: 'application/json' })
    link.href = URL.createObjectURL(file)
    link.download = 'template.json'
    link.click()
  }

  const getSelectedItems = (itemList: ItemListType): ItemListType => {
    const newList: ItemListType = {}
    Object.keys(itemList).forEach((key) => {
      if (itemList[key].selected) {
        newList[key] = itemList[key]
      }
    })
    return newList
  }

  const changeItemPosition = (fieldName: string, position: ControlPosition) => {
    const newItems = {
      ...items,
      [fieldName]: {
        ...items[fieldName],
        position: { ...position },
      },
    }

    onItemsChange(newItems)
  }

  const deleteTemplate = () => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить шаблон?')
    if (confirmed) {
      localStorage.removeItem('template')
      alert('Шаблон успешно удален')
    }
  }

  const printStart = () => {
    const divContents = document.getElementById('GFG').innerHTML
    // var a = window.open('', '', 'height=500, width=500')
    const a = window.open('', '_blank')
    const styles = document.querySelectorAll('style')
    a.document.write('<html>')
    a.document.write('<head>')
    styles.forEach((style) => a.document.write(style.outerHTML))
    a.document.write('</head>')
    a.document.write(`<body>`)
    a.document.write(divContents)
    a.document.write('</body></html>')
    a.document.close()
    a.print()
    // window.print()
    // const clone = React.cloneElement(templateRef.current as React.ReactElement)
    // console.log(templateRef)
  }

  const downloadPDF = () => {
    // const doc = new jsPDF({
    //   orientation: 'portrait',
    //   unit: 'mm',
    // })

    // const cnvs = html2canvas(templateRef.current, {})

    // doc.html(templateRef.current.outerHTML)
    // doc.save('template.pdf')

    var w = templateRef.current.offsetWidth
    var h = templateRef.current.offsetHeight
    const elem = html2canvas(templateRef.current, {
      // dpi: 300, // Set to 300 DPI
      scale: 3, // Adjusts your resolution
      // onrendered: function(canvas) {
      //   var img = canvas.toDataURL("image/jpeg", 1);
      //   var doc = new jsPDF('L', 'px', [w, h]);
      //   doc.addImage(img, 'JPEG', 0, 0, w, h);
      //   doc.save('sample-file.pdf');
      // }
    })

    elem.then((canvas) => {
      var img = canvas.toDataURL('image/jpeg', 1)
      // var doc = new jsPDF('L', 'px', [w, h]);
      const doc = new jsPDF({
        unit: 'px',
        orientation: 'portrait',
      })
      doc.addImage(img, 'JPEG', 0, 0, w, h)
      doc.save('sample-file.pdf')
    })
    // });
  }

  return (
    <div className="constructor">
      <Header />
      <div className="constructor__inner">
        <Template
          ref={templateRef}
          items={getSelectedItems(items)}
          onPositionChange={changeItemPosition}
        />
        <Toolbar
          onChangeItemState={changeItemState}
          items={items}
          onSaveTemplate={saveTemplate}
          onUseTemplate={useTemplate}
          onDeleteTemplate={deleteTemplate}
          onPrintStart={printStart}
          onDownloadTemplate={downloadTemplate}
          onDownloadPDF={downloadPDF}
        />
      </div>
    </div>
  )
}

export default CostructorPage
