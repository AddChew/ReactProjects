import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import withDataFetching from '../../withDataFetching'
import Board from '../Board/Board'
import Tickets from '../Tickets/Tickets'

const BoardsWrapper = styled.div`
    padding: 0rem 2rem 2rem;
`
function Boards({ data, loading, error }) {
    const [tickets, setTickets] = useState([])

    useEffect(() => setTickets(data), [data])

    function onDragStart(event, id) {
        event.dataTransfer.setData('id', id)
    }

    function onDragOver(event) {
        event.preventDefault()
    }

    function onDrop(event, laneid) {
        const id = event.dataTransfer.getData('id')
        const ticket = tickets.filter(ticket => ticket.id === parseInt(id))[0]
        ticket.lane = laneid
        setTickets(Array.from(new Set([...tickets, ticket])))
    }

    const lanes = [
        {id: 1, title: 'TO DO'},
        {id: 2, title: 'IN PROGRESS'},
        {id: 3, title: 'CODE REVIEW'},
        {id: 4, title: 'DONE'},
    ]
    const unassigned = {id: 0, title: 'UNASSIGNED'}
    return (
        <BoardsWrapper>
            <Board lanes={ lanes } tickets={ tickets } loading={ loading } error={ error }
            onDragStart={ onDragStart } onDragOver={ onDragOver } onDrop={ onDrop } />
            <Tickets unassigned={ unassigned } loading={ loading } error={ error }
            tickets={ tickets.filter(ticket => ticket.lane === unassigned.id) } 
            onDragStart={ onDragStart } onDragOver={ onDragOver } onDrop={ onDrop } />
        </BoardsWrapper>
    )
}

export default withDataFetching(Boards)