import React, { useContext } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Button } from '@bootstrap-styled/v4'
import { List } from '@styled-icons/bootstrap/List'
import { AppContext } from '../../containers/App'

const HeaderWrapper = styled.div`
    top: 0;
    position: sticky;
    display: flex;
    align-items: center;
    padding: 0.75rem;
    background-color: #20232a;
    justify-content: space-between;
`

const Meta = styled.div`
    display: flex;
    align-items: center;
`

const Logo = styled.img`
    height: 2rem;
    width: 2rem;
`

const Title = styled.h3`
    padding: 0rem 1rem;
    margin: 0;
    color: #f0f0f0;
`

const helmet = (
    <Helmet>
      <title>My Shopping List</title>
      <meta name="description" content="Shopping List created using React" />
  </Helmet>
)

const ToggleButton = styled(Button)`
    border: none !important;    
    padding: 0rem !important;
    background: transparent !important;
    color: #fff !important;

    :hover {
        color: #717171 !important;
    }

    @media (min-width: 840px) {
        display: none !important;
    }
`

function Header() {
    const [ state, setState ] = useContext(AppContext)

    function showLists() {
        setState({...state, display_lists: !state.display_lists})
    }

    return (
        <>
        { helmet }
        <HeaderWrapper>
            <Meta>
                <Logo src="cart.png"/>
                <Title>My Shopping List</Title>
            </Meta>
            <ToggleButton color="secondary" onClick={ showLists }>
                <List size="2rem" />
            </ToggleButton>
        </HeaderWrapper>
        </>
    )
}

export default Header