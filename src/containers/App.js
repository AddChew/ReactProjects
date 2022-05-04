import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Header from '../components/Header/Header'
import Boards from '../containers/Boards/Boards'

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`

function App() {
  const dataSource = './assets/data.json'
  return (
    <>
      <GlobalStyle />
      <Header />
      <Boards dataSource={ dataSource } />
    </>
  );
}

export default App