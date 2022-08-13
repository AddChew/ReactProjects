import React from 'react'

import Tabs from './Tabs'
import Footer from './Footer'
import Reviews from './Reviews'
import Overview from './Overview'

// TODO: Refactor state and setState with context
const ReviewsAccordionContent = ({ state, setState, hotel }) => (
    <>
    <Tabs close={ () => setState({ ...state, showReviews: !state.showReviews }) } />
    <Overview state={ state } setState={ setState } hotel={ hotel } />
    <Reviews reviews={ state.reviews } />
    <Footer close={ () => setState({ ...state, showReviews: !state.showReviews }) } />
    </>
)

export default ReviewsAccordionContent