// src/components/ResizeHandle.tsx
'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface ResizeHandleProps {
  onResize: (delta: number) => void
  direction?: 'horizontal' | 'vertical'
  className?: string
}

export function ResizeHandle({ onResize, direction = 'horizontal', className = '' }: ResizeHandleProps) {
  const [isDragging, setIsDragging] = useState(false)
  const startPosRef = useRef<number>(0)
  const onResizeRef = useRef(onResize)
  const directionRef = useRef(direction)

  // Mantém a referência mais recente do onResize
  useEffect(() => {
    onResizeRef.current = onResize
    directionRef.current = direction
  }, [onResize, direction])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    startPosRef.current = directionRef.current === 'horizontal' ? e.clientX : e.clientY
    document.body.style.cursor = directionRef.current === 'horizontal' ? 'col-resize' : 'row-resize'
    document.body.style.userSelect = 'none'
  }, [])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = directionRef.current === 'horizontal' ? e.clientX : e.clientY
      const delta = currentPos - startPosRef.current
      startPosRef.current = currentPos
      
      // Chama o onResize com throttle para evitar muitas atualizações
      if (Math.abs(delta) > 0.5) {
        onResizeRef.current(delta)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      className={`
        relative group cursor-col-resize select-none
        ${isDragging ? 'bg-blue-500/40' : 'hover:bg-blue-500/20'}
        ${className}
      `}
      onMouseDown={handleMouseDown}
    >
      <div className={`
        absolute inset-0 transition-colors duration-200
        ${isDragging ? 'bg-blue-500/30' : 'group-hover:bg-blue-500/10'}
      `} />
      
      <div className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-1 h-8 rounded-full transition-colors duration-200
        ${isDragging ? 'bg-blue-500' : 'bg-gray-400/30 group-hover:bg-gray-400/50'}
      `} />
    </div>
  )
}