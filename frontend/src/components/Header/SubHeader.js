import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { H2, Button } from '@bootstrap-styled/v4'

const SubHeaderWraper = styled.div`
    background-color: #d9edf7;
    text-align: center;
    padding: 1rem;
    overflow: auto;
`

const SubHeaderButton = styled(Button)`
    float: ${props => props.align} !important; 
`

const Title = styled(H2)`
    display: inline-block;
    margin: 0rem;
`

const SubHeader = ({ goBack, title, openForm }) => {
    const navigate = useNavigate()
    return (
        <SubHeaderWraper>
            { goBack && <SubHeaderButton onClick={ () => navigate(goBack) } align='left'>{ '< Back' }</SubHeaderButton> }
            <Title>{ title }</Title>
            { openForm && <SubHeaderButton onClick={ () => navigate(openForm) } align='right'>{ '+ Add Item' }</SubHeaderButton>}
        </SubHeaderWraper> 
    )   
}

export default SubHeader