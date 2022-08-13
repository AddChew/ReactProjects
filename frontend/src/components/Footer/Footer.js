import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Icon } from './trivago-footer.svg'
import { P } from '@bootstrap-styled/v4'

const FooterWrapper = styled.footer`
    background-color: #0a1121;
    text-align: center;
    padding: 2rem;
`

const CopyrightText = styled(P)`
    margin-top: 1rem;
    margin-bottom: 0rem;
    font-size: 0.75rem;
    color: #afb3bc;
`

const Footer = () => (
    <FooterWrapper>
        <Icon />
        <CopyrightText>
            Copyright 2022 trivago | All rights reserved.
        </CopyrightText>
    </FooterWrapper>
)

export default Footer