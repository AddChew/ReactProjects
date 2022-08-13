import React from 'react'
import styled from 'styled-components'

import { OverviewWrapper } from './Overview'
import { Title, TitleWrapper } from './Title'
import ReviewCard from '../../components/Review/ReviewCard'

const ReviewsWrapper = styled.div`
    border: 1px solid #dbdde1;
    border-radius: 0.5rem;
    padding: 0rem 1rem;
`

const NoReviewsWrapper = styled.div`
    padding-top: 1.5rem;
    padding-bottom: 1.25rem;
    font-size: 0.875rem;
`

const Reviews = ({ reviews }) => (
    <OverviewWrapper>
        <TitleWrapper>
            <Title>Recent guest reviews</Title>
        </TitleWrapper>
        <ReviewsWrapper>
            { !reviews.length && <NoReviewsWrapper>There are no reviews yet</NoReviewsWrapper> }
            { reviews.map(review => <ReviewCard key={ review.id } review={ review }/>)}
        </ReviewsWrapper>
    </OverviewWrapper>
)

export default Reviews