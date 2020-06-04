import React, { FC, useState } from 'react'
import {
  Grid,
  makeStyles,
  Typography,
  GridList,
  GridListTile,
  FormControl,
  InputLabel,
  Select,
  Switch,
  MenuItem,
  TextField,
  FormControlLabel,
  InputAdornment,
} from '@material-ui/core'
import { usePhotos } from '../../hooks/usePhotos'
import { useDebounce } from '../../hooks/useDebounce'
import IconSearch from '@material-ui/icons/Search'
import IconCamera from '@material-ui/icons/PhotoCameraOutlined'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  header: {
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr',
    alignItems: 'center',
    gridGap: '48px',
    position: 'sticky',
    background: theme.palette.background.paper,
    top: 0,
    zIndex: 1,
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
  title: {
    display: 'grid',
    flexDirection: 'column',
    gridTemplateColumns: 'auto 1fr',
    gridGap: '6px',
    alignItems: 'center',
  },
  titleLabel: {
    fontWeight: 400,
  },
}))

const App: FC = () => {
  const [search, setSearch] = useState('')
  const [columns, setColumns] = useState(4)
  const [adjust, setAdjust] = useState(true)
  const classes = useStyles()
  const query = useDebounce(search)

  const [photos] = usePhotos(query, columns, adjust)

  return (
    <Grid className={classes.root} spacing={2}>
      <div className={classes.header}>
        <div className={classes.title}>
          <IconCamera color='secondary' />
          <Typography
            variant='h5'
            align='left'
            color='primary'
            className={classes.titleLabel}>
            PhotoGram
          </Typography>
        </div>
        <TextField
          value={search}
          placeholder='Pesquisar'
          type='search'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <IconSearch />
              </InputAdornment>
            ),
          }}
          variant='outlined'
          onChange={(event) => setSearch(event.target.value)}
        />
        <div />
        <FormControl variant='outlined'>
          <InputLabel id='demo-simple-select-outlined-label'>
            Colunas
          </InputLabel>
          <Select
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            value={columns}
            onChange={(event) => {
              setColumns(Number(event.target.value))
            }}
            label='Age'>
            <MenuItem value={1}>Uma</MenuItem>
            <MenuItem value={2}>Duas</MenuItem>
            <MenuItem value={3}>Três</MenuItem>
            <MenuItem value={4}>Quatro</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={adjust}
              onChange={() => setAdjust((val) => !val)}
              name='checkedA'
            />
          }
          label='Ajuste dinâmico'
        />
      </div>
      <div className={classes.wrapper}>
        <GridList cellHeight={400} cols={columns} className={classes.list}>
          {photos.map((photo) => (
            <GridListTile key={photo.id} cols={photo.cols} rows={1}>
              <img src={photo.src.large} alt={photo.photographer} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Grid>
  )
}

export default App
