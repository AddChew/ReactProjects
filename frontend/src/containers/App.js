import React from 'react'
import Helmet from 'react-helmet'
import { Routes, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { Container } from '@bootstrap-styled/v4'
import Header from '../components/Header/Header'
import Lists from '../containers/Lists/Lists'
import List from '../containers/List/List'
import ItemForm from '../containers/ItemForm/ItemForm'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
`

export const Head = ({ title }) => (
  <Helmet>
      <title>{ title }</title>
      <meta name="description" content="Shopping List created using React" />
  </Helmet>
)

const AppWrapper = styled(Container)`
  background-color: #f5f5f5;
  padding: 0rem;
  min-height: 100vh;
`

const App = () => (
    <>
    <GlobalStyle />
    <AppWrapper>
      <Routes>
        <Route path='/' element={ <Header /> }>
          <Route index element={ <Lists /> } />
          <Route path='list/:id'>
            <Route index element={ <List />} />
            <Route path='new' element={ <ItemForm />} />
          </Route>
        </Route>
      </Routes>
    </AppWrapper>
    </>
)

export default App