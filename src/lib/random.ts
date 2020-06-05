import { Photo } from 'pexels'

const PHOTO_TEMPLATE: Photo = {
  id: 0,
  liked: false,
  src: {
    landscape: '',
    large: '',
    large2x: '',
    medium: '',
    original: '',
    portrait: '',
    small: '',
    tiny: '',
  },
  height: 0,
  width: 0,
  photographer: '',
  photographer_id: '',
  photographer_url: '',
  url: '',
}

export const getRandomList = (): Photo[] => {
  const list = new Array(10).fill(PHOTO_TEMPLATE)

  return list.map((photo, index) => {
    const isLandscape = Boolean(Math.round(Math.random()))

    return {
      ...photo,
      id: index,
      width: isLandscape ? 1920 : 1080,
      height: isLandscape ? 1080 : 1920,
    }
  })
}
