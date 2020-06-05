import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 24,
  },
  link: {
    marginBottom: 12,
    textDecoration: 'none',
    color: 'initial',
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <a className={classes.link} href='https://www.pexels.com'>
        <Typography>Photos provided by Pexels</Typography>
      </a>
      <a href='https://www.pexels.com'>
        <img height={36} src='https://images.pexels.com/lib/api/pexels.png' />
      </a>
    </div>
  )
}

export default Footer
