import styled from 'styled-components'

import { Title, TitleWrapper } from './Title'
import GreenButton from '../../components/Button/GreenButton'
import OverviewCard from '../../components/Review/OverviewCard'
import ReviewForm from '../ReviewForm/ReviewForm'

export const OverviewWrapper = styled.div`
    padding: 1rem 1rem 0rem;
    cursor: default;

    :last-of-type {
        margin-bottom: 0.5rem;
    }
`
// Need setState here so that we can permute the state when we add a review
const Overview = ({ state, setState, hotel }) => (
    <OverviewWrapper>
        <TitleWrapper>
            <Title>Rating overview</Title>
            <GreenButton onClick={ () => setState({ ...state, modalOpen: true })}>+ Add Review</GreenButton> 
        </TitleWrapper>
        <OverviewCard avgRating={ state.avg_rating } numReviews={ state.num_reviews } />
        <ReviewForm state={ state } setState={ setState } hotel={ hotel } />
    </OverviewWrapper>
)

export default Overview