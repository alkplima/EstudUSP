import styled, { createGlobalStyle } from "styled-components";

import "react-circular-progressbar/dist/styles.css";

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
    background: ${props => props.theme['surface']};
    color: ${props => props.theme['gray-300']};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Segoe_UI', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  input, textarea {
    caret-color: ${props => props.theme['primary']};
  }

  h1 {
    font: 700 3.5rem/4.25rem 'Segoe_UI_Bold', sans-serif;
  }

  h2 {
    font: 700 3rem/3.5rem 'Segoe_UI_Bold', sans-serif;
  }

  h3 {
    font: 700 2.5rem/3rem 'Segoe_UI_Bold', sans-serif;
  }

  h4 {
    font: 700 2rem/2.5rem 'Segoe_UI_Bold', sans-serif;
  }

  h5 {
    font: 700 1.5rem/1.75rem 'Segoe_UI_Bold', sans-serif;
  }

  h6 {
    font: 700 1.25rem/1.5rem 'Segoe_UI_Bold', sans-serif;
  }

  p {
    font: 400 1rem/1.5rem 'Segoe_UI', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p {
    color: ${props => props.theme['inverse-surface']};
  }

  @font-face {
    font-family: 'Segoe_UI';
    src: url('/fonts/segoe_ui.ttf');
  }

  @font-face {
    font-family: 'Segoe_UI_Bold';
    src: url('/fonts/segoe_ui_bold.ttf');
  }

  @media(max-width: 1080px) {
    html {
      font-size: 82.5%;
    }
  }
`;

export const Subtitle = styled.p`
  font: 700 1rem/1.25rem 'Segoe_UI_Bold', sans-serif;
  color: ${props => props.theme['neutral-40']};
`;