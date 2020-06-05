import React, { FC, useMemo, useCallback } from 'react'
import {
  makeStyles,
  GridList,
  GridListTile,
  CircularProgress,
  Typography,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import { usePhotos } from '../../../hooks/usePhotos'
import { useDebounce } from '../../../hooks/useDebounce'
import useHeaderContext from '../../../hooks/useHeaderContext'
import { getRandomList } from '../../../lib/random'
import { getPhotoOrder } from '../../../lib/grid'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 36,
    alignItems: 'center',
  },
  loadingContainer: {
    minHeight: 64,
  },
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: '48px 0',
  },
  list: {
    maxWidth: 1440,
    width: '100%',
    transform: 'translateZ(0)',
  },
  item: {
    border: '1px solid #bdbdbd',
    borderRadius: '6px',
    flex: 1,
  },
  nothing: {
    margin: '48px 0',
  },
}))

const Photos: FC = () => {
  const classes = useStyles()
  const { searchText, adjust, columns } = useHeaderContext()
  const query = useDebounce(searchText.value)
  const [photos, loading, refetching] = usePhotos(
    query,
    columns.value,
    adjust.value
  )
  const skeleton = getPhotoOrder(getRandomList(), columns.value, adjust.value)

  const renderPhotos = useMemo(
    () => (
      <GridList
        spacing={16}
        cellHeight={400}
        cols={Math.min(photos.length, columns.value)}>
        {photos.map((photo) => (
          <GridListTile
            key={photo.id}
            rows={1}
            cols={Math.min(photos.length, photo.cols)}
            classes={{ tile: classes.item }}>
            <img
              draggable={false}
              src={photo.src.large}
              alt={photo.photographer}
            />
          </GridListTile>
        ))}
      </GridList>
    ),
    [photos, columns.value, adjust.value]
  )

  const renderSkeleton = useMemo(
    () => (
      <GridList spacing={16} cellHeight={400} cols={columns.value}>
        {skeleton.map((photo) => (
          <GridListTile
            key={photo.id}
            rows={1}
            cols={photo.cols}
            classes={{ tile: classes.item }}>
            <Skeleton
              animation='wave'
              variant='rect'
              width={photo.width}
              height={photo.height}
            />
          </GridListTile>
        ))}
      </GridList>
    ),
    [columns.value, adjust.value]
  )

  const renderNothing = useMemo(
    () =>
      searchText.value && (
        <Typography className={classes.nothing} variant='h4'>
          {'No results have been found for "' + searchText.value + '".'}
        </Typography>
      ),
    [searchText.value]
  )

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.list}>
          <div hidden={loading}>{renderPhotos}</div>
          <div hidden={!loading}>{renderSkeleton}</div>
          <div hidden={!(!photos.length && !loading && !refetching)}>
            {renderNothing}
          </div>
        </div>
      </div>
      <div className={classes.loadingContainer}>
        <div hidden={!refetching}>
          <CircularProgress />
        </div>
      </div>
    </div>
  )
}

export default Photos
