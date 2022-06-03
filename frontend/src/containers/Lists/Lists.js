import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Alert } from '@bootstrap-styled/v4'
import { Head } from '../App'
import SubHeader from '../../components/Header/SubHeader'
import ListList from '../../components/ListItem/ListList'
import withDataFetching from '../../withDataFetching'
import LISTS_API from '../../api/Lists'

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

const Lists = ({ data, loading, error }) => {
    const color = error ? 'danger' : 'info'
    return (
        <>
        <Head title='My Lists' />
        <SubHeader title='My Lists' />
        <ListsWrapper>
            { (loading || error) && <Alert color={ color }>{ loading ? 'Loading...' : error }</Alert>}
            { data.map(list => <CustomLink key={ list.id } to={ `/list/${list.id}`}><ListList item={ list } /></CustomLink>)}
        </ListsWrapper>
        </>        
    )
}

export default withDataFetching({ dataSource: LISTS_API })(Lists)