import React from 'react'
import ReactDom from 'react-dom'
import { ThemeProvider, ThemeOptions, createMuiTheme } from '@material-ui/core'
import Home from './containers/home'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import './assets/styles.scss'

const theme: ThemeOptions = createMuiTheme({
  palette: {
    primary: {
      main: '#022965',
    },
    secondary: {
      main: '#a20000',
    },
  },
})

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/search' component={Home} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
)

ReactDom.render(<App />, document.getElementById('root'))
