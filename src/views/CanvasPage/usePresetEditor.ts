import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'

const usePresetEditor = (
  canvasRef: MutableRefObject<HTMLCanvasElement>,
  isReady: boolean,
  onMouseUp: (e: fabric.IEvent<MouseEvent>) => void
) => {
  const canvas = useRef<fabric.Canvas>(null)

  useEffect(() => {
    if (isReady && canvasRef.current && !canvas.current) {
      canvas.current = new fabric.Canvas(canvasRef.current, {
        selection: true,
      })
      canvas.current.on('mouse:up', onMouseUp)
    }
  }, [canvasRef.current])

  return canvas.current
}

export { usePresetEditor }
