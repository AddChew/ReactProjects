import React from 'react'
import styled from 'styled-components'
import Lane from '../../components/Lane/Lane'

const BoardWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 0rem 0rem 2rem;
    min-height: 40vh;
    
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

function Board({ lanes, tickets, loading, error, onDragStart, onDragOver, onDrop}) {
    return (
        <BoardWrapper>
            { lanes.map(lane => 
                <Lane key={ lane.id } laneid={ lane.id } title={ lane.title } 
                tickets={ tickets.filter(ticket => ticket.lane === lane.id )} 
                loading={ loading } error={ error } onDragStart={ onDragStart } 
                onDragOver={ onDragOver } onDrop={ onDrop } />
            )}
        </BoardWrapper>
    )
}

export default Board