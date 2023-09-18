import {BaseStyles, ThemeProvider, theme} from '@primer/react'
import deepmerge from 'deepmerge'
import { BrowserRouter } from "react-router-dom";
import './global.css'
import { Router } from "./Router";

const customTheme = deepmerge(theme, {
  fonts: {
    normal: 'Roboto, sans-serif',
    mono: 'MonoLisa, monospace',
  },
})


function App() {


  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme} dayScheme='dark_dimmed'>
        <BaseStyles>
          <Router />

        </BaseStyles>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
