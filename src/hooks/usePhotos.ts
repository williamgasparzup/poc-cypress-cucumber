import { createClient, Photo } from 'pexels'
import { useState, useEffect, useCallback, useRef } from 'react'
import usePagination from './usePagination'
import uniqBy from '../lib/uniqBy'
import { getPhotoOrder } from '../lib/grid'

const apiKey = process.env.API_KEY || ''
const client = createClient(apiKey)
const { photos } = client

const PER_PAGE = 10
const INITIAL_PAGE = 1

export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export const usePhotos = (
  searchText = '',
  columns: number,
  adjust: boolean
) => {
  const [data, setData] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [refetching, setRefetching] = useState(false)
  const [page, resetPage] = usePagination(INITIAL_PAGE, loading)
  const searchRef = useRef(searchText)
  const pageRef = useRef(page)

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
    if (page === pageRef.current) {
      return
    }

    setRefetching(true)
    getPhotos(searchRef.current, page)
      .then((response) => {
        if ('photos' in response) {
          setData((previous) => uniqBy('id', [...previous, ...response.photos]))
        }
      })
      .finally(() => setRefetching(false))

    pageRef.current = page
  }, [getPhotos, page])

  return [getPhotoOrder(data, columns, adjust), loading, refetching] as const
}
