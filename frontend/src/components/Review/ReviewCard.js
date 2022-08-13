import styled from 'styled-components'

const ReviewCardWrapper = styled.div`
    padding-top: 1.5rem;
    padding-bottom: 1.25rem;
    display: flex;

    :not(:first-of-type) {
        border-top: 1px solid #dbdde1;
    }
`

const RatingWrapper = styled.div`
    padding-right: 1rem;
    width: 8.6875rem;
`

const Rating = styled.span`
    background-color: #005f00;
    margin-right: 0.25rem;
    align-items: center;
    justify-content: center;
    display: inline-flex;
    border-radius: 2rem;
    font-size: 0.875rem;
    height: 2.25rem;
    font-weight: 700;
    color: #ffffff;
    width: 3rem;
`

const TravellerWrapper = styled.div`
    font-size: 0.875rem;
    margin: 0.5rem 0rem;
    line-height: 1.25;
`

const DateWrapper = styled(TravellerWrapper)`
    line-height: 2;
`

const ReviewWrapper = styled.div`
    flex-direction: column;
    font-size: 0.875rem;
    display: flex;
    flex-grow: 1;
`

const TitleWrapper = styled.h5`
    margin-top: 0rem;
    margin-bottom: 0.5rem;
    font-style: italic;
    font-weight: 700;
`

const DescriptionWrapper = styled.p`
    margin: 0rem;
    line-height: 2;
`

const ReviewCard = ({ review }) => (
    <ReviewCardWrapper >
        <RatingWrapper>
            <Rating>{ review.rating.toFixed(1) }</Rating>
            <TravellerWrapper>Traveller</TravellerWrapper>
            <DateWrapper>Date of review: N/A</DateWrapper>
        </RatingWrapper>
        <ReviewWrapper>
            <TitleWrapper>"{ review.title }"</TitleWrapper>
            <DescriptionWrapper>{ review.description }</DescriptionWrapper>
        </ReviewWrapper>
    </ReviewCardWrapper>
)

export default ReviewCard