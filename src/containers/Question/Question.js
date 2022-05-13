import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Container } from '@bootstrap-styled/v4'
import Card from '../../components/Card/Card'

const QuestionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`

const ROOT_API = 'https://api.stackexchange.com/2.2/'

function Question() {
    const [state, setState] = useState({data: [], loading: true, error: ''})
    const params = useParams()

    useEffect(fetchQuestion, [])

    function fetchQuestion() {
        fetch(`${ROOT_API}questions/${params.id}?site=stackoverflow`)
        .then(data => data.json())
        .then(dataJSON => {
            if (dataJSON) setState({...state, data: dataJSON.items[0], loading: false})
        })
        .catch(error => setState({...state, loading: false, error: error.message}))
    }

    const { data, loading, error } = state
    if (loading || error) {
        return (
            <>
            <Helmet>
                <title>{ `Question ${params.id} - Stack Overflow` }</title>
            </Helmet>
            <div>{ loading ? 'Loading...' : error }</div>
            </>
        )
    }
    return (
        <>
        <Helmet>
            <title>{ `Question ${params.id} - Stack Overflow` }</title>
        </Helmet>
        <Container>
            <QuestionWrapper>
                <Card feed={ data } />
            </QuestionWrapper>
        </Container>
        </>

    )
}

export default Question