import React, { FC } from 'react'
import {
  makeStyles,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Switch,
  MenuItem,
  TextField,
  FormControlLabel,
  InputAdornment,
} from '@material-ui/core'
import { scrollTop } from '../../../hooks/usePhotos'
import useHeaderContext from '../../../hooks/useHeaderContext'
import IconSearch from '@material-ui/icons/Search'
import IconCamera from '@material-ui/icons/PhotoCameraOutlined'

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '0.5fr 3fr 2fr 1fr 1fr',
    gridTemplateRows: '64px',
    alignItems: 'center',
    gridGap: '48px',
    position: 'sticky',
    background: theme.palette.background.paper,
    borderBottom: '1px solid #eeeeee',
    top: 0,
    zIndex: 1,
  },
  title: {
    display: 'grid',
    flexDirection: 'column',
    gridTemplateColumns: 'auto 1fr',
    gridGap: '6px',
    alignItems: 'center',
    cursor: 'pointer',
  },
  titleLabel: {
    fontWeight: 400,
  },
}))

const Header = () => {
  const classes = useStyles()
  const { adjust, searchText, columns } = useHeaderContext()

  return (
    <div className={classes.header}>
      <div className={classes.title} onClick={scrollTop}>
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
        value={searchText.value}
        placeholder='Search (e.g.: ocean, sky, life, etc...)'
        type='search'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <IconSearch />
            </InputAdornment>
          ),
        }}
        variant='outlined'
        onChange={(event) => searchText.setValue(event.target.value)}
      />
      <div />
      <FormControl variant='outlined'>
        <InputLabel id='select-label'>Columns</InputLabel>
        <Select
          labelId='select-label'
          id='select'
          value={columns.value}
          onChange={(event) => {
            columns.setValue(Number(event.target.value))
          }}
          label='Age'>
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={4}>Four</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={adjust.value}
            onChange={() => adjust.setValue((val) => !val)}
            name='checkedA'
          />
        }
        label='Dynamic layout'
      />
    </div>
  )
}

export default Header
