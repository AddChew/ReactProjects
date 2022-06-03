import React from 'react'
import styled from 'styled-components'

const ListItemWrapper = styled.div`
    background-color: #ffffff;
    display: flex;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
`

const Title = styled.span`
    flex-basis: 70%;
    font-weight: bold;
    text-align: left;
`

const ListList = ({ item }) => (
    <ListItemWrapper>
        <Title>{ item.title }</Title>
    </ListItemWrapper>
)

export default ListList