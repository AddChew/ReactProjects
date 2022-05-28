import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Button, Alert } from '@bootstrap-styled/v4'
import { Edit } from '@styled-icons/material/Edit'
import ListItem from '../../components/ListItem/ListItem'
import { AppContext, LISTS_API } from '../App'

const ListsWrapper = styled.div`
    border-right: 1px solid #e3e3e3;
    min-width: 25rem;
    width: 25rem;
    overflow: hidden;

    :hover {
        overflow: auto;
    }
    
    @media (max-width: 840px) {
        display: ${props => props.display_lists ? 'block' : 'none'};
    }
`

const UnorderedList = styled.ul`
    margin: 0rem;
    padding: 0.5rem;
`

const NewListButton = styled(Button)`
    position: absolute;
    bottom: 1rem;
    left: 20.625rem;
    height: 3.375rem;
    width: 3.375rem;
    border-radius: 1.6875rem !important;

    @media (min-width: 100rem) {
        left: calc( (100vw - 100rem) / 2 + 20.625rem)
    }
`

const ListsAlert = styled(Alert)`
    margin: 0.5rem;
`

function Lists() {
    const [ state, setState ] = useContext(AppContext)

    useEffect(fetchLists, [])
    useEffect(setActiveList, [state.lists])

    function fetchLists() {
        axios.get(LISTS_API)
        .then(response => {
            setState({...state, lists: response.data.results, list: {...state.list, loading: false}})
        })
        .catch(error => setState({...state, list: {...state.list, loading: false, error: error.message}}))
    }

    function setActiveList() {
        if (state.lists.length !== 0) setState({...state, active_list: state.lists[0].url})
    }

    function open() {
        setState({...state, modal: {open: true, new_item: false, title: 'New List', item: {}}})
    }

    const { display_lists, lists, list } = state
    const { loading, error } = list
    return (
        <ListsWrapper display_lists={ display_lists }>
            { loading && <ListsAlert color="info">Loading...</ListsAlert>}
            { error && <ListsAlert color="danger">{ error }</ListsAlert>}
            <UnorderedList>
                { lists.map(list => <ListItem key={ list.id } list={ list } />)}
            </UnorderedList>
            <NewListButton color="success" onClick={ open }>
                <Edit size="1.4rem" />
            </NewListButton>
        </ListsWrapper>
    )
}

export default Lists