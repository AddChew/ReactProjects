import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Alert } from '@bootstrap-styled/v4'
import { Head } from '../App'
import SubHeader from '../../components/Header/SubHeader'
import ListList from '../../components/ListItem/ListList'
import { ListsContext } from '../../context/ListsContextProvider'

const ListsWrapper = styled.div`
    margin: 0rem;
    padding: 1rem;
`

const CustomLink = styled(Link)`
    color: #000000;
    text-decoration: none;

    :hover {
        color: #0275d8;
    }
`

const Lists = () => {
    const { lists, loading, error, getListsRequest } = useContext(ListsContext)
    const color = error ? 'danger' : 'info'

    useEffect(() => {
        if (!lists.length) {
            getListsRequest()
        }
    }, [lists, getListsRequest])

    return (
        <>
        <Head title='My Lists' />
        <SubHeader title='My Lists' />
        <ListsWrapper>
            { (loading || error) && <Alert color={ color }>{ loading ? 'Loading...' : error }</Alert>}
            { lists.map(list => <CustomLink key={ list.id } to={ `/list/${list.id}`}><ListList item={ list } /></CustomLink>)}
        </ListsWrapper>
        </>        
    )
}

export default Lists