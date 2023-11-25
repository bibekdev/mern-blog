import { MouseEvent, MutableRefObject, useLayoutEffect, useState } from 'react'

export const useDetectClickOutside = (
  ref: MutableRefObject<HTMLDivElement | null>,
  initialState: boolean
) => {
  const [isActive, setIsActive] = useState(initialState)

  useLayoutEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (ref.current !== null && !ref.current.contains(event.target as Node)) {
        setIsActive(!isActive)
      }
    }

    if (isActive)
      window.addEventListener('mousedown', onClick as unknown as EventListener)

    return () =>
      window.removeEventListener(
        'mousedown',
        onClick as unknown as EventListener
      )
  }, [isActive, ref])

  return [isActive, setIsActive] as const
}
