import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    /* box-shadow: 0 0 0 2px ${props => props.theme['green-500']}; */
  }

  body {
    background: ${props => props.theme['gray-900']};
    color: ${props => props.theme['gray-300']};
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Segoe_UI', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  @font-face {
    font-family: 'Segoe_UI';
    src: url('/fonts/segoe_ui.ttf');
  }

  @font-face {
    font-family: 'Segoe_UI_Bold';
    src: url('/fonts/segoe_ui_bold.ttf');
  }

`;