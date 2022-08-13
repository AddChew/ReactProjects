import React, { useState } from 'react'
import styled from 'styled-components'

import HotelRating from './HotelRating'
import ReviewsAccordionTab from './ReviewsAccordionTab'
import ReviewsAccordionContent from '../../containers/Reviews/ReviewsAccordionContent'

const HotelCardWrapper = styled.article`
    box-shadow: 0 1px 4px 0 rgba(10, 17, 33, 0.65);
    background-color: #ffffff;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
`

const HotelDetailsContainer = styled.div`
    padding: 0.25rem;
    display: flex;
`

const HotelDetailsWrapper = styled.div`
    padding: 0.5rem 0.75rem 0.75rem;
    width: 40%;
`

const Title = styled.h2`
    font-size: 1.25rem;
    margin: 0rem;
`

const Thumbnail = styled.img`
    border-radius: 0.5rem;
    display: block;
`

const HotelCard = ({ hotel }) => {
    const [state, setState] = useState({
        modalOpen: false,
        showReviews: false, 
        reviews: hotel.reviews,
        avg_rating: (hotel.reviews.reduce((prev, curr) => prev + curr.rating, 0) / hotel.reviews.length || 0).toFixed(1),
        num_reviews: hotel.reviews.length,
    })

    return (
        <HotelCardWrapper>
            <HotelDetailsContainer>
                <Thumbnail src={ hotel.thumbnail } width={ 300 } />
                <HotelDetailsWrapper>
                    <Title>{ hotel.title }</Title>
                    <HotelRating hotel={ hotel } />
                    <ReviewsAccordionTab state={ state } setState={ setState } />
                </HotelDetailsWrapper>
            </HotelDetailsContainer>
            { state.showReviews && <ReviewsAccordionContent state={ state } setState={ setState } hotel={ hotel } /> }
        </HotelCardWrapper>
    )
}

export default HotelCard