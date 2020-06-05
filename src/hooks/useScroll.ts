import { useEffect, useCallback, useRef } from 'react'
import { debounce } from '../lib/debounce'

type Options = {
  offset?: number
  onReachEnd: () => void
}

const useScroll = (options: Options) => {
  const element = useRef(document.body)
  const { offset = 300, onReachEnd } = options

  const handleScroll = useCallback(() => {
    const { height, top } = element.current.getBoundingClientRect()

    if (offset >= height - (window.innerHeight - top)) {
      onReachEnd()
    }
  }, [offset, onReachEnd])

  useEffect(() => {
    element.current.onscroll = debounce(handleScroll, 300)

    return () => {
      element.current.onscroll = () => {}
    }
  }, [handleScroll])
}

export default useScroll
