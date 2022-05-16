import React from 'react'
import styled from 'styled-components'

// TODO
// Background color: #f5f5f5
// Border: 1px solid #e3e3e3
const ListItemWrapper = styled.li`
    background-color: #f0f0f0; 
    list-style-type: none;
    padding: 1rem;
    border-radius: 0.25rem;

    :not(:last-child) {
        margin-bottom: 0.5rem;
    }
`

function ListItem() {
    return (
        <ListItemWrapper>
            Groceries
        </ListItemWrapper>
    )
}

export default ListItem