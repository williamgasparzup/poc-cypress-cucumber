import { useState, useCallback } from 'react'
import useScroll from './useScroll'

const usePagination = (initialPage: number) => {
  const [page, setPage] = useState(initialPage)

  useScroll({
    onReachEnd: () => setPage(page + 1),
  })

  const resetPage = useCallback(() => {
    setPage(initialPage)
  }, [initialPage])

  return [page, resetPage] as const
}

export default usePagination
