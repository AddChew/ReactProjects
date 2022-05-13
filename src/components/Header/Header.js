import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
    top: 0;
    display: flex;
    align-items: center;
    justify-content: left;
    height: 3.125rem;
    padding: 0rem 0.5rem;
    background-color: #f8f8f8;
    border-top: 0.2rem solid #f48225;
    pointer-events: none;
    box-shadow: 0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);
    position: sticky;
`

const Logo = styled.span`
    background-image: url('https://cdn.sstatic.net/Img/unified/sprites.svg?v=fcc0ea44ba27');
    height: 3.125rem;
    width: 11.75rem;
`

function Header() {
    return (
        <>
        <Helmet>
            <title>Stack Overflow</title>
            <meta name='description' content='Stack Overflow clone built with React'/>
        </Helmet>
        <HeaderWrapper>
            <Logo />
        </HeaderWrapper>
        </>
    )
}

export default Header