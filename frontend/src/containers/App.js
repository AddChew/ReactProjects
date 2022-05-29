import React, { createContext, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Header from '../components/Header/Header'
import Lists from './Lists/Lists'
import List from './List/List'
import ModalForm from './ModalForm/ModalForm'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar {
    width: 0.4rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6d6d6;
    border-radius 0.2rem;
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
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
  }
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 3.5rem);
  max-height: calc(100vh - 3.5rem);
`

const ListWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`

export const LISTS_API = 'http://localhost:8000/api/lists/'
export const ITEMS_API = 'http://localhost:8000/api/items/'
export const AppContext = createContext()

function App() {
  const [state, setState] = useState({
    active_list: null,
    display_lists: false,
    modal: {open: false, new_item: false, title: '', item: {}},
    lists: [],
    list: {title: null, items: [], loading: true, error: ''}
  })

  return (
    <>
    <GlobalStyle />
    <AppWrapper>
      <AppContext.Provider value={ [state, setState] }>
        <Header />
        <RowWrapper>
          <Lists />
          <ListWrapper>
            <List />
          </ListWrapper>
        </RowWrapper>
        <ModalForm />
      </AppContext.Provider>
    </AppWrapper>
    </>
  )
}

export default App