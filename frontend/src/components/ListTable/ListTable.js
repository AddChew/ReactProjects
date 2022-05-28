import React, { useContext } from 'react'
import styled from 'styled-components'
import { Edit } from '@styled-icons/material/Edit'
import { Delete } from '@styled-icons/material/Delete'
import { Button, Table, Thead, Tr, Th, Tbody, Td } from '@bootstrap-styled/v4'
import { AppContext } from '../../containers/App'
import { ListContext } from '../../containers/List/List'
import axios from 'axios'

const TableWrapper = styled.div`
    border: 1px solid #e3e3e3;
    max-height: calc(100% - 2rem);
    overflow: hidden;

    :hover {
        overflow: auto;
    }
`

const BorderedTable = styled(Table)`
    font-size: 0.95rem;
    margin-bottom: 0rem !important;
`

const TableHeader = styled(Th)`
    top: 0;
    position: sticky;
    background-color: #ffffff;
    border: none !important;
`

const Index = styled(Th)`
    vertical-align: middle !important;
`

const TableData = styled(Td)`
    vertical-align: middle !important;
`

const ActionButton = styled(Button)`
    font-size: 0.95rem;
    padding: 0.25rem 0.5rem !important;

    :not(:last-child) {
        margin-right: 0.5rem;
    }

    @media (max-width: 604px) {
        :not(:last-child) {
            margin-bottom: 0.5rem;
        }
    }
`

function ListTableRow({ itemNo, item }) {
    const [ state, setState ] = useContext(AppContext)

    function open() {
        setState({...state, modal: {open: true, new_item: true, title: 'Edit Item', item: item}})
    }

    function deleteRow() {
        axios.delete(item.url)
        .then(() => setState({...state, list: {...state.list, items: state.list.items.filter(row => row.url !== item.url)}}))
        .catch(error => console.log(error))
    }

    return (
        <Tr>
            <Index scope="row">{ itemNo }</Index>
            <TableData>{ item.title }</TableData>
            <TableData>{ item.qty }</TableData>
            <TableData>${ item.price.toFixed(2) }</TableData>
            <TableData>{ item.created }</TableData>
            <TableData>
                <ActionButton color="info" onClick={ open }>
                    <Edit size="1.25rem" />
                </ActionButton>
                <ActionButton color="danger" onClick={ deleteRow }>
                    <Delete size="1.25rem" />
                </ActionButton>
            </TableData>
        </Tr>
    )
}

function ListTable() {
    const [state, useState] = useContext(AppContext)
    const items = state.list.items
    return (
        <TableWrapper>
            <BorderedTable striped hover>
                <Thead>
                    <Tr>
                        <TableHeader></TableHeader>
                        <TableHeader>Item</TableHeader>
                        <TableHeader>Quantity</TableHeader>
                        <TableHeader>Price</TableHeader>
                        <TableHeader>Created</TableHeader>
                        <TableHeader>Action</TableHeader>
                    </Tr>
                </Thead>
                <Tbody>
                    { items.map((item, index) => <ListTableRow key={ index } itemNo={ index + 1 } item={ item } />) }
                </Tbody>
            </BorderedTable>
        </TableWrapper>
    )
}

export default ListTable
