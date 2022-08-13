import React from 'react'
import styled from 'styled-components'

import HotelCard from '../../components/Hotel/HotelCard'

const HotelsWrapper = styled.section`
    min-height: calc(100vh - 14.5625rem);
    max-width: 61.25rem;
    margin: auto;
    margin-bottom: 1.25rem;
`

const Title = styled.h2`
    color: #0a1121 !important;
    font-size: 1.25rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`

const Hotels = ({hotels}) => (
    <HotelsWrapper>
        <Title>Hotels</Title>
        { hotels.map(hotel => <HotelCard key={ hotel.id } hotel={ hotel }/>)}
    </HotelsWrapper>
)

export default Hotels