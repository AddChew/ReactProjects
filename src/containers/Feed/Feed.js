import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Container } from '@bootstrap-styled/v4'
import Card from '../../components/Card/Card'
import PaginationBar from '../../components/PaginationBar/PaginationBar'

const FeedWrapper = styled.div`
    border-left: 1px solid #d6d9dc;
    border-right: 1px solid #d6d9dc; 
`

const Title = styled.h2`
    font-weight: 400;
    text-align: left;
    margin: 0rem;
    padding: 1.5rem 1.5rem 2rem;
`

const ROOT_API = 'https://api.stackexchange.com/2.2/'

function Feed() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [state, setState] = useState({
        feeds: [], 
        page: 1,
        pagesize: 15,
        last_page: false,
        loading: true, 
        error: ''
    })

    useEffect(fetchFeeds, [searchParams])

    function fetchFeeds() {
        const page = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1
        const pagesize = searchParams.get('pagesize') ? parseInt(searchParams.get('pagesize')) : 15
        fetch(`${ROOT_API}questions?order=desc&pagesize=${pagesize}&site=stackoverflow&page=${page}`)
        .then(feeds => feeds.json())
        .then(feedsJSON => {
            if (feedsJSON.items) setState({...state, feeds: feedsJSON.items, loading: false, page: page, pagesize: pagesize, last_page: !feedsJSON.has_more})
            else setState({...state, loading: false, error: feedsJSON.error_message})
        })
        .catch(error => setState({...state, loading: false, error: error.message}))
    }

    const { feeds, page, pagesize, last_page, loading, error } = state
    if (loading || error) {
        return (
            <>
            <Helmet>
                <title>Newest Questions - Stack Overflow</title>
            </Helmet>
            <div>{ loading ? 'Loading...' : error }</div>
            </>
        )
    }
    return (
        <>
        <Helmet>
            <title>Newest Questions - Stack Overflow</title>
        </Helmet>
        <Container>
            <FeedWrapper>
                <Title>All Questions</Title>
                { feeds.map(feed => <Card key={ feed.question_id } feed={ feed } />)}
                <PaginationBar page={ page } pagesize={ pagesize } last_page={ last_page } />
            </FeedWrapper>
        </Container>
        </>
    )
}

export default Feed