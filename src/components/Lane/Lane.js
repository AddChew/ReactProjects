import React from 'react'
import styled from 'styled-components'
import Ticket from '../Ticket/Ticket'

const LaneWrapper = styled.div`
    list-style: none;
    text-align: left;
    padding: 1rem;
    background: #EBECF0;
    border-radius: .3rem;
    width: 20vw;

    @media (max-width: 768px) {
        margin-bottom: 1rem;
        min-height: 20vh;

        :last-child {
            margin-bottom: 0rem;
        }
    }
`

const Title = styled.h5`
    color: #505F79;
    margin: 0rem;
`

function Lane({ laneid, title, tickets, loading, error, onDragStart, onDragOver, onDrop }) {
    return (
        <LaneWrapper onDragOver={ onDragOver } onDrop={ event => onDrop(event, laneid) } >
            <Title>{ title }</Title>
            { (loading||error) && <div>{ loading ? 'Loading...' : error }</div>}
            { tickets.map(ticket => 
                <Ticket key={ ticket.id } ticket={ ticket } onDragStart={ onDragStart } />
            )}
        </LaneWrapper>
    )
}

export default Lane