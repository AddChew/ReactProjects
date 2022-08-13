import styled from 'styled-components'

import CrossButton from '../../components/Button/CrossButton'

const Header = styled.div`
    border-top: 1px solid #f9fafa;
    border-bottom: 1px solid #dbdde1;
    justify-content: space-between;
    display: flex;
`

const TabsWrapper = styled.div`
    justify-content: center;
    display: flex;
    width: 100%;
`

const Tab = styled.div`
    border-bottom: 2px solid transparent;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 700;
    color: #6c707a;
    display: flex;
    height: 3rem;

    :hover {
        background-color: #f3f4f5;
        cursor: pointer;
        color: #0a1121;
    }
`

const ActiveTab = styled(Tab)`
    border-bottom: 2px solid #007cc2;
    color: #007cc2;
`

const Tabs = ({ close }) => (
    <Header>
        <TabsWrapper>
            <Tab>Overview</Tab>
            <Tab>Info</Tab>
            <Tab>Photos</Tab>
            <ActiveTab>Reviews</ActiveTab>
            <Tab>Deals</Tab>
        </TabsWrapper>
        <CrossButton onClick={ close } />
    </Header>
)

export default Tabs