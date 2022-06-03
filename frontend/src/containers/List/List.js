import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { Alert } from '@bootstrap-styled/v4'
import { Head } from '../App'
import SubHeader from '../../components/Header/SubHeader'
import ListItem from '../../components/ListItem/ListItem'
import LISTS_API from '../../api/Lists'

const ListWrapper = styled.div`
    padding: 1rem;
`

const List = () => {
    const { id } = useParams()
    const [ state, setState ] = useState({ list: [], loading: true, error: ''})

    useEffect(fetchList, [])

    function fetchList() {
        axios.get(`${LISTS_API}${id}`)
        .then(response => setState({...state, list: response.data, loading: false}))
        .catch(error => setState({...state, loading: false, error: error.message}))
    }

    const { list, loading, error } = state
    const color = error ? 'danger' : 'info'
    return (
        <>
        <Head title='List' />
        <SubHeader goBack='/' title={ list.title } openForm='new' />
        { (loading || error) ? <ListWrapper><Alert color={ color }>{ loading ? 'Loading...' : error }</Alert></ListWrapper> : (
        <ListWrapper>
            { list.items.map(item => <ListItem key={ item.id } item={ item } />) }
        </ListWrapper>
        )}
        </>
    )
}

export default List