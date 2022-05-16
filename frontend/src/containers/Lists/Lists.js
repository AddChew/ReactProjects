import React, { useEffect } from 'react'
import styled from 'styled-components'
import ListItem from '../../components/ListItem/ListItem'

const ListsWrapper = styled.div`
    border-right: 1px solid #f0f0f0;
    width: 26.5rem;

    @media (max-width: 768px) {
        display: none;
    }
`

const UnorderedList = styled.ul`
    margin: 0rem;
    padding: 0.5rem;
`

function Lists() {

    useEffect(testapi, [])
    
    function testapi() {
        fetch('http://localhost:8000')
        .then(data => data.json())
        .then(dataJSON => console.log(dataJSON))
    }

    return (
        <ListsWrapper>
            <UnorderedList>
                <ListItem />
                <ListItem />
            </UnorderedList>
        </ListsWrapper>
    )
}

export default Lists