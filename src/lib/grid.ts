import { Photo } from 'pexels'

const WIDE_PHOTOS = 2
const REGULAR_PHOTOS = 1

type PhotoWithCols = Photo & { cols: number }

const getRowWidth = (row: PhotoWithCols[] = []) =>
  row.reduce((all, curr) => all + curr.cols, 0)

export const getPhotoOrder = (
  photos: Photo[],
  columns: number,
  adjust: boolean
): PhotoWithCols[] => {
  if (!adjust) {
    return photos.map((photo) => ({ ...photo, cols: 1 }))
  }

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
