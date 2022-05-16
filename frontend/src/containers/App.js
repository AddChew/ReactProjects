import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Header from '../components/Header/Header'
import Lists from './Lists/Lists'
import List from './List/List'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }
`

const AppWrapper = styled.div`
  width: 100%;
  max-width: 100rem;

  @media (min-width: 100rem) {
    border-left: 1px solid #f0f0f0;
    border-right: 1px solid #f0f0f0;
  }
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 3.5rem);
`

const ListWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`

function App() {
  return (
    <>
    <GlobalStyle />
    <AppWrapper>
      <Header />
      <RowWrapper>
        <Lists />
        <ListWrapper>
          <Lists />
        </ListWrapper>
      </RowWrapper>
    </AppWrapper>
    </>
  )
}

export default App;
