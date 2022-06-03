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

const Meta = styled.span`
    flex-basis: 15%;
    font-weight: bold;
    text-align: right;
`

const ListItem = ({ item }) => (
    <ListItemWrapper>
        <Title>{ item.title }</Title>
        <Meta>Quantity: { item.qty }</Meta>
        <Meta>${ item.price }</Meta>
    </ListItemWrapper>
)

export default ListItem