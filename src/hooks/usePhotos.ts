import { createClient, Photo } from 'pexels'
import { useState, useEffect, useCallback, useRef } from 'react'
import usePagination from './usePagination'
import uniqBy from '../lib/uniqBy'

const apiKey = process.env.API_KEY || ''
const client = createClient(apiKey)
const { photos } = client

const PER_PAGE = 10
const INITIAL_PAGE = 1
const WIDE_PHOTOS = 2
const REGULAR_PHOTOS = 1

type PhotoWithCols = Photo & { cols: number }

export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const getRowWidth = (row: PhotoWithCols[] = []) =>
  row.reduce((all, curr) => all + curr.cols, 0)

const getPhotoOrder = (photos: Photo[], columns: number): PhotoWithCols[] => {
  const rows = new Map<number, PhotoWithCols[]>()
  const columnSize = Math.max(columns - 1, 1)

  for (const photo of photos) {
    const index = rows.size - 1
    const isLandscape = photo.width > photo.height
    const cols = isLandscape ? WIDE_PHOTOS : REGULAR_PHOTOS

    if (index < 0) {
      rows.set(0, [{ ...photo, cols }])
    } else {
      const currentRow = rows.get(index)
      const width = getRowWidth(currentRow)

      if (!currentRow) {
        continue
      }

      if (width === columnSize) {
        rows.set(index, [...currentRow, { ...photo, cols: 1 }])
      } else if (width < columnSize) {
        rows.set(index, [...currentRow, { ...photo, cols }])
      } else {
        rows.set(index + 1, [{ ...photo, cols }])
      }
    }
  }

  return Array.from(rows).reduce(
    (all, [, current]) => [...all, ...current],
    [] as PhotoWithCols[]
  )
}

export const usePhotos = (
  searchText = '',
  columns: number,
  adjust: boolean
) => {
  const searchRef = useRef(searchText)
  const [data, setData] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [refetching, setRefetching] = useState(false)
  const [page, resetPage] = usePagination(INITIAL_PAGE)

  const getPhotos = useCallback((query: string, currentPage?: number) => {
    searchRef.current = query
    const page = currentPage || INITIAL_PAGE

    if (query) {
      return photos.search({ query, per_page: PER_PAGE, page })
    } else {
      return photos.curated({ per_page: PER_PAGE, page })
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    getPhotos(searchText)
      .then((response) => {
        if ('photos' in response) {
          setData(response.photos)
        }
      })
      .then(scrollTop)
      .finally(() => setLoading(false))

    return resetPage
  }, [searchText, getPhotos, resetPage])

  useEffect(() => {
    setRefetching(true)
    getPhotos(searchRef.current, page)
      .then((response) => {
        if ('photos' in response) {
          setData((previous) => uniqBy('id', [...previous, ...response.photos]))
        }
      })
      .finally(() => setRefetching(false))
  }, [getPhotos, page])

  if (adjust) {
    return [getPhotoOrder(data, columns), loading, refetching] as const
  }

  return [
    data.map((photo) => ({ ...photo, cols: 1 })),
    loading,
    refetching,
  ] as const
}
