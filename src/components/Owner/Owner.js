import he from 'he'
import React from 'react'
import styled from 'styled-components'

const OwnerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const Avatar = styled.img`
    display: block;
    height: 1rem;
    width: 1rem;
    margin-right: 0.5rem;
`

const Name = styled.a`
    text-decoration: none;
    font-size: 0.8rem;
    color: #0074cc;
`

function Owner({ owner }) {
    return (
        <OwnerWrapper>
            <Avatar src={ owner.profile_image } />
            <Name href={ owner.link }>
                { he.decode(owner.display_name) }
            </Name>
        </OwnerWrapper>
    )
}

export default Owner