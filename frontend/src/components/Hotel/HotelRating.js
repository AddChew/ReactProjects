import styled from 'styled-components'
import { ReactComponent as Star } from './star.svg'

const StarsWrapper = styled.div`
    margin-top: 0.4rem;
    color: #fc9e15;
    display: flex;
    align-items: center;
`

const Stars = hotel => {
    let stars = []
    for (let i = 0; i < hotel.rating; i++) {
        stars.push(<Star key={ `${hotel.id}_${i}`}/>)
    }
    return stars
}

const HotelLabel = styled.span`
    margin-left: 0.5rem;
    font-size: 0.875rem;
    color: #000000;
`

const HotelRating = ({ hotel }) => (
    <StarsWrapper>
        { Stars(hotel) }
        <HotelLabel>Hotel</HotelLabel>
    </StarsWrapper>
)

export default HotelRating