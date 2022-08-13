import React from 'react'
import styled from 'styled-components'
import { ReactComponent as CrossIcon } from './cross.svg'

const CrossButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c707a;
    width: 3rem;

    :hover {
        background-color: #f3f4f5;
        cursor: pointer;
        color: #0a1121;
    }
`

const CrossWrapper = styled.span`
    display: inline-flex;
    width: 50%;
`

const Cross = () => (
    <CrossWrapper>
        <CrossIcon />
    </CrossWrapper>
)

const CrossButton = ({onClick}) => (
    <CrossButtonWrapper onClick={ onClick }>
        <Cross />
    </CrossButtonWrapper>
)

export default CrossButton