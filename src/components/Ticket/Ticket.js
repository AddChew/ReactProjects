import React from 'react'
import styled from 'styled-components'

const TicketWrapper = styled.div`
    background: #ffffff;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: .3rem;
    max-width: calc(20vw - 2rem);

    :not(:last-child) {
        margin-right: ${props => props.marginRight ? '1rem;' : '0rem'}
    }

    @media (max-width: 768px) {
        max-width: none;
        margin-right: 0rem !important;
    }
`

const Title = styled.h5`
    margin: 0rem;   
`

const Body = styled.p`
    font-size: 0.83rem;
    margin-bottom: 0rem;
`

function Ticket({ ticket, marginRight, onDragStart }) {
    return (
        <TicketWrapper marginRight={ marginRight } draggable 
        onDragStart={ event => onDragStart(event, ticket.id) } >
            <Title>{ ticket.title }</Title>
            <Body>{ ticket.body }</Body>
        </TicketWrapper>
    )
}

export default Ticket