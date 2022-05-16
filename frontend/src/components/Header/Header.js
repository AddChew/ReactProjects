import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
    top: 0;
    position: sticky;
    display: flex;
    align-items: center;
    padding: 0.75rem;
    background-color: #20232a;
`

const Logo = styled.img`
    height: 2rem;
    width: 2rem;
`

const Title = styled.h3`
    padding: 0rem 1rem;
    margin: 0;
    color: #f0f0f0;
`

const helmet = (
    <Helmet>
      <title>My Shopping List</title>
      <meta name="description" content="Shopping List created using React" />
  </Helmet>
  )

function Header() {
    return (
        <>
        { helmet }
        <HeaderWrapper>
            <Logo src="cart.png"/>
            <Title>My Shopping List</Title>
        </HeaderWrapper>
        </>
    )
}

export default Header