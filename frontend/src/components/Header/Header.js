import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const HeaderWraper = styled.div`
    background-color: #0275d8;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
`

const Title = styled.h1`
    pointer-events: none;
`

const Header = () => (
    <>
    <HeaderWraper>
        <Title>My Shopping List</Title>
    </HeaderWraper>
    <Outlet />  
    </> 
)

export default Header