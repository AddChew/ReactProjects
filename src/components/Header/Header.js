import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
    background-color: #282c34;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    padding-top: 2.5rem;
`

const Logo = styled.img`
    height: 64px;
    pointer-events: none;
`

function Header({ logo, username }) {
    return (
        <HeaderWrapper>
            <Logo src={ logo } alt="logo" />
            <h1>{ username }'s Github Portfolio</h1>            
        </HeaderWrapper>
    )
}

export default Header