import { useRef, useEffect } from 'react'

type UseCenterModalProps = {
  orginBottomMargin?: number
}

/**
 * * This is a custom React hook that centers a modal on the screen and adjusts its position if it exceeds the viewport height.
 * @param {UseCenterModalProps} `orginBottomMargin 'indicates the bottom margin of the Modal you want to control
 * @returns This `ref` object is used to reference the DOM element that needs to be centered
 * vertically within the viewport.
 */
const useCenterModalRef = <T extends HTMLElement>({
  orginBottomMargin
}: UseCenterModalProps = {}) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (ref.current) {
      const viewportHeight = window.innerHeight
      const modalHeight = ref.current.clientHeight
      if (modalHeight > viewportHeight) {
        if (orginBottomMargin) {
          ref.current.style.marginTop = `
            calc(${modalHeight - viewportHeight}px + ${orginBottomMargin}rem)
          `
        } else {
          ref.current.style.marginTop = `
            calc(${modalHeight - viewportHeight}px + 3rem)
          `
          ref.current.style.marginBottom = '3rem'
        }
      }
    }
  }, [ref.current, orginBottomMargin])

  return ref
}

export default useCenterModalRef
