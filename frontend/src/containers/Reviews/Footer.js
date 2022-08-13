import styled from 'styled-components'

import WhiteButton from '../../components/Button/WhiteButton'

const FooterWrapper = styled.footer`
    justify-content: right;
    border-top: 1px solid #dbdde1;
    padding: 0.5rem;
    display: flex;
`

const Footer = ({ close }) => (
    <FooterWrapper>
        <WhiteButton onClick={ close }>Close</WhiteButton>
    </FooterWrapper>
)

export default Footer