import React, { useContext } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Button } from '@bootstrap-styled/v4'
import { Delete } from '@styled-icons/material/Delete'
import { AppContext } from '../../containers/App'

const ListItemWrapper = styled.li`
    background-color: #f5f5f5; 
    list-style-type: none;
    padding: 1rem;
    border-radius: 0.25rem;
    border: ${props => props.active ? '2px solid #717171' : '1px solid #e3e3e3'};

    :hover {
        cursor: pointer;
        background-color: #ededed;
    }
    
    :not(:last-child) {
        margin-bottom: 0.5rem;
    }
`

const Meta = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.h4`
    margin: 0rem;
`

const Created = styled.p`
    margin: 0rem;
    margin-right: 0.25rem;
    font-size: 0.8rem;
    color: #898989;
`

const DeleteButton = styled(Button)`
    font-size: 0.95rem;
    padding: 0rem !important;
    background-color: transparent !important;
    border: none !important;
`

const DeleteIcon = styled(Delete)`
    color: #d6d6d6;

    :hover {
        color: #717171;
    }
`

const DeleteWrapper = styled.div`
    display: flex;
    align-items: center;
`

function ListItem({ list }) {
    const [state, setState] = useContext(AppContext)

    function activateListItem() {
        setState({...state, active_list: list.url})
    }

    function deleteListItem(event) {
        event.stopPropagation()
        axios.delete(list.url)
        .then(() => setState({...state, lists: state.lists.filter(item => item.url !== list.url)}))
        .catch(error => console.log(error))
    }

    return (
        <ListItemWrapper active={ state.active_list === list.url } onClick={ activateListItem }>
            <Meta>
                <Title>{ list.title }</Title>
                <DeleteWrapper>
                    <Created>{ list.created }</Created>
                    <DeleteButton color="secondary" onClick={ deleteListItem }>
                        <DeleteIcon size="1.5rem" />
                    </DeleteButton>
                </DeleteWrapper>
            </Meta>
        </ListItemWrapper>
    )
}

export default ListItem