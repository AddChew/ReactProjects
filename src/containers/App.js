import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import Header from '../components/Header/Header'
import Feed from './Feed/Feed'
import Question from './Question/Question'

const GlobalStyle = createGlobalStyle`
  body {
    text-align: center;
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
  return (
    <>
    <GlobalStyle />
    <Header />
    <Routes>
      <Route path="/" element={ <Feed /> }/>
      <Route path="questions">
        <Route index element={ <Feed /> } />
        <Route path=":id" element={ <Question /> } />
      </Route>
    </Routes>
    </>
  )
}

export default App