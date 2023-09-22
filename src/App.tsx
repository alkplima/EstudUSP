// import {BaseStyles, ThemeProvider, theme} from '@primer/react'

// import deepmerge from 'deepmerge'
import { BrowserRouter } from "react-router-dom";
// import './global.css'
import { Router } from "./Router";
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';
import { PostsProvider } from './contexts/PostsContext';
import { ThemeProvider } from "styled-components";

// const customTheme = deepmerge(theme, {
//   fonts: {
//     normal: 'Segoe_UI, sans-serif',
//     mono: 'MonoLisa, monospace',
//   },
// })


function App() {


  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme} /*nightScheme='dark_dimmed'*/>
        <GlobalStyle />
        {/* <BaseStyles> */}
        <PostsProvider>
          <Router />
        </PostsProvider>

        {/* </BaseStyles> */}
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
