import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem 1rem;
`

const Title = styled.h3`
    color: #282c34;
    margin: 0rem;
    pointer-events: none;
`

function Header() {
    return (
        <HeaderWrapper>
            <Title>Kanban Board</Title>
        </HeaderWrapper>
    )
}

export default Header