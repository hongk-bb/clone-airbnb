import { useEffect } from 'react'

/**
 * This is a TypeScript function that listens for clicks outside of a specified HTML element and
 * triggers a callback function when a click occurs outside of that element.
 * @param ref - A React ref object that points to the HTML element that you want to detect clicks
 * outside of.
 * @param onClickOutside - onClickOutside is a function that will be called when a click event occurs
 * outside of the element referenced by the ref object. It can be any function that you want to execute
 * when the user clicks outside of the element.
 */
const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  onClickOutside: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClickOutside])
}

export default useClickOutside
