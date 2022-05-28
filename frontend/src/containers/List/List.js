import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Button, Alert } from '@bootstrap-styled/v4'
import { Add } from '@styled-icons/material-outlined/Add'
import ListTable from '../../components/ListTable/ListTable'
import { AppContext } from '../App'

const ListWrapper = styled.div`
    flex: 1;
    padding: 2rem 2rem;
    max-width: 45.5rem;
`

const Title = styled.h2`
    margin: 0rem;
`

const Meta = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`

const AddIcon = styled(Add)`
    vertical-align: bottom;
`

const AddButton = styled(Button)`
    font-size: 0.95rem;
    padding: 0.5rem !important;
`

function List() {
    const [ state, setState ] = useContext(AppContext)

    useEffect(fetchItems, [state.active_list])

    function fetchItems() {
        if (state.active_list) {
            axios.get(state.active_list)
            .then(response => setState({...state, list: {...state.list, ...response.data, loading: false}}))
            .catch(error => setState({...state, list: {...state.list, loading: false, error: error.message}}))
        }
    }

    function open() {
        setState({...state, modal: {open: true, new_item: true, title: 'Add Item', item: {}}})
    }

    const list = state.list
    return (
        <ListWrapper>
            { list.loading && <Alert color="info">Loading...</Alert>}
            { list.error && <Alert color="danger">{ list.error }</Alert>}
            { list.title &&
                <>
                <Meta>
                    <Title>{ list.title }</Title>
                    <AddButton color="success" onClick={ open }>
                        <AddIcon size="1.25rem" />
                        Add Item
                    </AddButton>
                </Meta>
                <ListTable />
                </>          
            }
        </ListWrapper>
    )
}

export default List