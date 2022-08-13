import styled from 'styled-components'
import { ReactComponent as ArrowIcon } from './arrow.svg'

const ReviewsWrapper = styled.div`
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    justify-content: space-between;
    border-top: 1px solid #f3f4f5;
    align-items: center;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    display: flex;

    :hover {
        background-color: #f3f4f5;
        cursor: pointer;
    }

    :active {
        outline-offset: -0.5rem;
        outline: 1px dotted #6c707a;
    }
`

const Rating = styled.span`
    background-color: #005f00;
    margin-right: 0.25rem;
    justify-content: center;
    display: inline-flex;
    border-radius: 2rem;
    font-size: 0.75rem;
    height: 1.125rem;
    font-weight: 700;
    color: white;
    width: 2rem;
`

const ArrowWrapper = styled.span`
    display: inline-block;
    vertical-align: middle;
    transform: rotate(90deg);
`

const Arrow = () => (
    <ArrowWrapper>
        <ArrowIcon />
    </ArrowWrapper>
)

// TODO: Update average rating, number of reviews, reviews in state when a new review is added
const ReviewsAccordionTab = ({ state, setState }) => (
    <ReviewsWrapper onClick={ () => setState({ ...state, showReviews: !state.showReviews }) }>
        <span>
            <Rating>
                { state.avg_rating }
            </Rating>
            { `(${state.num_reviews} reviews)`}
        </span>
        <Arrow />
    </ReviewsWrapper>
)

export default ReviewsAccordionTab