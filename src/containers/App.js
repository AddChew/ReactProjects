import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Profile from './Profile/Profile'
import Header from '../components/Header/Header'
import logo from '../GitHub-Mark-Light-120px-plus.png'

const GlobalStyle = createGlobalStyle`
  body {
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

const AppWrapper = styled.div`
  text-align: center;
`

function App() {
  const username = window.location.pathname.slice(1) ? window.location.pathname.slice(1) : "octocat"
  document.title = `${username}'s Github Portfolio`
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Header logo={ logo } username={ username } />
        <Profile username={ username} />      
      </AppWrapper>
    </>
  )
}

export default App;
