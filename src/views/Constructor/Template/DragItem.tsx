import Draggable, { ControlPosition } from 'react-draggable'

import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import './style.css'
import { resizingType } from './Template'

type sizeType = {
  height: number
  width: number
}

type startResizeType = (
  dir: 'left' | 'right' | 'bottom',
  fieldName: string,
  originSizes: sizeType,
  position: ControlPosition,
  e?: React.MouseEvent<HTMLDivElement>
) => void

interface Props {
  onStart?: (e) => void
  onDrag?: (e) => void
  onStop?: (e, data) => void
  position?: ControlPosition
  onStartResize: startResizeType
  tempSizes?: sizeType
  resizing: resizingType
  field: string
}

const DragItem: React.FC<Props> = ({
  onStop,
  onDrag,
  onStart,
  position,
  children,
  onStartResize,
  resizing,
  tempSizes,
  field,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [sizes, setSizes] = useState<sizeType>({ height: 150, width: 150 })

  const handleStart = (e) => {
    onStart && onStart(e)
  }
  const handleDrag = (e) => {
    onDrag && onDrag(e)
  }
  const handleStop = (e, data) => {
    onStop && onStop(e, data)
  }

  const startResizeHandler = (dir: 'right' | 'left' | 'bottom') => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      onStartResize(dir, field, sizes, position, e)
    }
  }

  useEffect(() => {
    if (!resizing && tempSizes) {
      setSizes({ ...tempSizes })
    }
  }, [resizing, tempSizes])

  const getItemStyles = (): CSSProperties => {
    const styles: CSSProperties = {
      height: tempSizes?.height || sizes.height + 'px',
      width: tempSizes?.width || sizes.width + 'px',
    }
    return styles
  }

  const getResizerClassName = (type: resizingType) => {
    const classNames = [`drag-item__resizer-${type}`]
    if (type === 'right' && resizing === 'right') {
      classNames.push('resize')
    }
    return classNames.join(' ')
  }

  return (
    <Draggable
      axis="both"
      handle=".drag-item__dragger"
      bounds=".template"
      defaultPosition={position || { x: 0, y: 0 }}
      position={position || null}
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div className="drag-item" ref={ref} style={getItemStyles()}>
        <div className="drag-item__dragger"></div>
        <div
          className={getResizerClassName('right')}
          onMouseDown={startResizeHandler('right')}
        ></div>
        <div
          className={getResizerClassName('left')}
          onMouseDown={startResizeHandler('left')}
        ></div>
        <div
          className={getResizerClassName('bottom')}
          onMouseDown={startResizeHandler('bottom')}
        ></div>
        {children}
      </div>
    </Draggable>
  )
}

export default DragItem
