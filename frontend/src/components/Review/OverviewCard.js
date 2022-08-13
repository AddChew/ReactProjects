import styled from 'styled-components'

const OverviewCardWrapper = styled.div`
    border: 1px solid #dbdde1;
    border-radius: 0.5rem;
    padding: 1rem;
    height: 12.5rem;
`

const RatingWrapper = styled.div`
    border-right: 1px solid #dbdde1;
    padding-right: 1rem;
    width: 33.333333%;
    height: 100%;
`

const Rating = styled.span`
    background-color: #005f00;
    margin-right: 0.25rem;
    justify-content: center;
    display: inline-flex;
    border-radius: 2rem;
    font-size: 1.5rem;
    height: 2.25rem;
    font-weight: 700;
    color: #ffffff;
    width: 3.75rem;
`

const RatingDetails = styled.div`
    font-size: 0.875rem;
    margin-top: 1rem;
`

const OverviewCard = ({ avgRating, numReviews}) => (
    <OverviewCardWrapper>
        <RatingWrapper>
            <Rating>{ avgRating }</Rating>
            <RatingDetails>
                <strong>trivago Rating Index</strong> based on <strong>{ numReviews }</strong> reviews
            </RatingDetails>
        </RatingWrapper>
    </OverviewCardWrapper>
)

export default OverviewCard