import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import './style.css'
import Draggable, { ControlPosition, DraggableData } from 'react-draggable'
import DragItem from './DragItem'
import { ItemListType } from '../../../App'
// import { ItemListType } from '../CostructorPage'

type sizeType = {
  height: number
  width: number
}

export type resizingType = 'right' | 'bottom' | 'left' | null

interface Props {
  items: ItemListType
  onPositionChange: (fieldName: string, position: ControlPosition) => void
}

const Template = React.forwardRef<HTMLDivElement, Props>(
  ({ items, onPositionChange }, ref) => {
    const handleStop = (fieldName: string) => {
      return (e, data: DraggableData) => {
        onPositionChange(fieldName, {
          x: data.lastX,
          y: data.lastY,
        })
      }
    }

    const [resizingItem, setResizingItem] = useState<string>(null)
    const [resizing, setResizing] = useState<resizingType>(null)
    const [tempSizes, setTempSizes] = useState<sizeType | null>(null)
    const [originSizes, setOriginSizes] = useState<sizeType>(null)
    const [originPosition, setOriginPosition] = useState<ControlPosition>(null)
    const [from, setFrom] = useState<number>(0)

    const startResize = (
      dir: 'left' | 'right' | 'bottom',
      fieldName: string,
      sizes: sizeType,
      psition: ControlPosition,
      e: React.MouseEvent<HTMLDivElement>
    ) => {
      setResizing(dir)
      setResizingItem(fieldName)
      setOriginSizes(sizes)
      setTempSizes(sizes)
      setOriginPosition(psition)
      setFrom(dir === 'bottom' ? e.clientY : e.clientX)
    }

    const endResizeRight = (e: React.MouseEvent<HTMLDivElement>) => {
      setResizing(null)
    }

    useEffect(() => {
      if (!resizing) {
        setResizingItem(null)
        setOriginSizes(null)
        setTempSizes(null)
        setOriginPosition(null)
        setFrom(0)
      }
    }, [resizing])

    const resize = (e: React.MouseEvent<HTMLDivElement>) => {
      if (resizing === 'right') {
        const diff = e.clientX - from
        setTempSizes((prev) => ({
          ...prev,
          width: Math.max(originSizes.width + diff, 30),
        }))
      }

      if (resizing === 'left') {
        const diff = from - e.clientX
        setTempSizes((prev) => ({
          ...prev,
          width: Math.max(originSizes.width + diff, 30),
        }))
        onPositionChange(resizingItem, {
          x: originPosition.x - diff,
          y: items[resizingItem].position.y,
        })
      }

      if (resizing === 'bottom') {
        const diff = e.clientY - from
        setTempSizes((prev) => ({
          ...prev,
          height: Math.max(originSizes.height + diff, 30),
        }))
      }
    }

    return (
      <div className="template-wrapper" ref={ref} id="GFG">
        <div
          className="template"
          onMouseMove={resize}
          onMouseUp={endResizeRight}
          onMouseLeave={endResizeRight}
        >
          {Object.keys(items).map((name) => (
            <DragItem
              key={name}
              onStop={handleStop(name)}
              position={items[name].position}
              onStartResize={startResize}
              resizing={resizing}
              tempSizes={resizingItem === name ? tempSizes : null}
              field={name}
            >
              {items[name].content}
            </DragItem>
          ))}
        </div>
      </div>
    )
  }
)

export default Template
