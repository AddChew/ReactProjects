import React from 'react'
import { Routes, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import Layout from './Layout/Layout'
import Hotels from './Hotels/Hotels'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const AppWrapper = styled.div`
  background-color: #f9fafa;
  min-height: 100vh;
  padding: 0rem;
`

// TODO: To integrate with api call
const data = [
  {id: 1, thumbnail: 'assets/beachfront-hotel.jpg', title: 'Beachfront Hotel', rating: '3', reviews: [{id: 1, title: 'Value for money', description: 'Fantastic facilities!', rating: 5, hotel_id: 1}, {id: 3, title: 'Not worth the price', description: 'Poor service', rating: 2, hotel_id: 1}]},
  {id: 2, thumbnail: 'assets/forest-apartments.jpg', title: 'Forest Apartments', rating: '2', reviews: [{id: 2, title: 'Pleasant stay!', description: 'Remarkable service', rating: 5, hotel_id: 2}]}
]

const App = () => (
  <>
  <GlobalStyle />
  <AppWrapper>
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Hotels hotels={ data } /> } />
      </Route>
    </Routes>
  </AppWrapper>
  </>
)

export default App