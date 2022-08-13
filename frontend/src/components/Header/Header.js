import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Icon } from './trivago-header.svg'

const HeaderWrapper = styled.div`
    background-color: #ffffff;
    height: 4rem;
    border-bottom: 0.0625rem solid #dbdde1;
`

const IconWrapper = styled.div`
    padding: 1rem;
    
    svg {
        height: 2rem;
        width: 6.375rem;        
    }
`

const Header = () => (
    <HeaderWrapper>
        <IconWrapper>
            <Icon />
        </IconWrapper>
    </HeaderWrapper>
)

export default Header