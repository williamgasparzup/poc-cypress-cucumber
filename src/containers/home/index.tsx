import React, { FC, useState } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { HeaderContext } from '../../hooks/useHeaderContext'
import Header from './header'
import Photos from './photos'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
}))

const App: FC = () => {
  const [searchText, setSearchText] = useState('')
  const [columns, setColumns] = useState(3)
  const [adjust, setAdjust] = useState(true)
  const classes = useStyles()

  const value = {
    adjust: {
      value: adjust,
      setValue: setAdjust,
    },
    searchText: {
      value: searchText,
      setValue: setSearchText,
    },
    columns: {
      value: columns,
      setValue: setColumns,
    },
  }

  return (
    <HeaderContext.Provider value={value}>
      <Grid className={classes.root}>
        <Header />
        <Photos />
      </Grid>
    </HeaderContext.Provider>
  )
}

export default App
