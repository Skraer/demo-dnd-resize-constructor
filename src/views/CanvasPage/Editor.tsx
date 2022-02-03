import React, { useEffect, useRef, useState } from 'react'
import './style.css'

import { fabric } from 'fabric'
import { ItemListType, ItemType } from '../../App'
import { usePresetEditor } from './usePresetEditor'

type TextboxListType = {
  [key: string]: {
    textbox: fabric.Textbox
    isRendered: boolean
  }
}

const getDefaultTextboxes = (items: ItemListType) => {
  const textboxes: TextboxListType = Object.keys(items).reduce(
    (prev, key, idx) => {
      const item = items[key]
      const textbox = new fabric.Textbox(item.content, {
        top: item.position.y,
        left: item.position.x,
        width: 150,
        height: 150,
        editable: true,
        hasBorders: true,
        hasControls: true,
        hasRotatingPoint: true,
      })

      return {
        ...prev,
        [key]: {
          textbox,
          isRendered: false,
        },
      }
    },
    {} as TextboxListType
  )

  return textboxes
}

interface Props {
  items: ItemListType
  width: number
  height: number
  onPositionChange: (
    fieldName: string,
    position: { x: number; y: number }
  ) => void
}

const Editor = React.forwardRef<HTMLDivElement, Props>(
  ({ items, width, height, onPositionChange }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const mouseUpHandler = (e: fabric.IEvent<MouseEvent>) => {
      if (e.target) {
        const fieldName = Object.keys(textboxes).find((key) => {
          const item = textboxes[key].textbox
          return item === e.target
        })

        const [x, y] = [e.target.left, e.target.top]

        onPositionChange(fieldName, {
          x: Number(x.toFixed(3)),
          y: Number(y.toFixed(3)),
        })
      }
    }

    const canvas = usePresetEditor(
      canvasRef,
      Boolean(width && height),
      mouseUpHandler
    )

    const [textboxes, setTextboxes] = useState<TextboxListType>(
      getDefaultTextboxes(items)
    )

    useEffect(() => {
      if (!canvas) return

      Object.keys(items).forEach((key) => {
        const item = items[key]
        const textbox = textboxes[key]

        if (item.selected && !textbox.isRendered) {
          canvas.add(textbox.textbox)
          textbox.isRendered = true
        } else if (!item.selected && textbox.isRendered) {
          canvas.remove(textbox.textbox)
          textbox.isRendered = false
        }
      })
    }, [items])

    return (
      <div ref={ref} key={'canvas'} className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          id="canvas"
          className="canvas"
          width={width}
          height={height}
        ></canvas>
      </div>
    )
  }
)

export default Editor
