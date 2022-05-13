import he from 'he'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Owner from '../Owner/Owner'

const CardWrapper = styled.div`
    text-align: left;
    border-top: 1px solid #d6d9dc;
    padding: 1rem 1.5rem;
    margin-right: 1.5rem;
`

const Title = styled.h4`
    font-weight: 400;
    display: inline-block;
    margin: 0rem;
    color: #0074cc;
`

const Meta = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 1rem;
`

const CountWrapper = styled.div`
    font-size: 0.9rem;
    color: #6a737c;
`

const Count = styled.span`
    margin-right: 0.5rem;
`

function Card({ feed }) {
    return (
        <CardWrapper>
            <Link to={ `/questions/${feed.question_id}` }>
                <Title>{ he.decode(feed.title) }</Title>
            </Link>
            <Meta>
                <CountWrapper>
                    <Count>{ `${ feed.answer_count } answers` }</Count>
                    <Count>{ `${ feed.view_count } views` }</Count>
                </CountWrapper>
                <Owner owner={ feed.owner } />
            </Meta>
        </CardWrapper>
    )
}

export default Card