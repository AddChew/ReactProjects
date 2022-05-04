import React from 'react'
import styled from 'styled-components'
import Ticket from '../../components/Ticket/Ticket'

const BoardWrapper = styled.div`
    background: #EBECF0;
    border-radius: .3rem;
    padding: 1rem;
`

const TicketsWrapper = styled.div`
    display: flex;
    justify-content: left;
    flex-direction: row;
    min-height: 20vh;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const Title = styled.h5`
    color: #505F79;
    margin: 0rem;
`

function Tickets({ unassigned, tickets, loading, error, onDragStart, onDragOver, onDrop }) {
    return (
        <BoardWrapper onDragOver={ onDragOver } onDrop={ event => onDrop(event, unassigned.id) } >
            <Title>{ unassigned.title }</Title>
            <TicketsWrapper>
                { (loading || error) && <div>{ loading ? 'Loading...' : error }</div>}
                { tickets.map(ticket => <Ticket key={ ticket.id } ticket={ ticket } marginRight onDragStart={ onDragStart }/>)}
            </TicketsWrapper>
        </BoardWrapper>
    ) 
}

export default Tickets