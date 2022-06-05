import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Alert } from '@bootstrap-styled/v4'
import { Head } from '../App'
import SubHeader from '../../components/Header/SubHeader'
import ListItem from '../../components/ListItem/ListItem'
import { ListContext } from '../../context/ListContextProvider'

const ListWrapper = styled.div`
    padding: 1rem;
`

const List = () => {
    const { id } = useParams()
    const { list, loading, error, getListRequest } = useContext(ListContext)

    useEffect(() => {
        if (!list.length) {
            getListRequest(id)
        }
    }, [])

    const color = error ? 'danger' : 'info'
    return (
        <>
        <Head title='List' />
        <SubHeader goBack='/' title={ list.title } openForm='new' />
        <ListWrapper>
            { (loading || error) ? <Alert color={ color }>{ loading ? 'Loading...' : error }</Alert> : 
                list.items.map(item => <ListItem key={ item.id } item={ item } />)}
        </ListWrapper>
        </>
    )
}

export default List