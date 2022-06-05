import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Input, Alert } from '@bootstrap-styled/v4'
import { AppContext, ITEMS_API, LISTS_API } from '../App'
import axios from 'axios'

const CustomInput = styled(Input)`
    box-sizing: border-box;
`

function ModalForm() {
    const [state, setState] = useContext(AppContext)
    const [formState, setFormState] = useState({error: ''})

    function submit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        let api = state.modal.title === 'Edit List' ? state.modal.item.url : LISTS_API

        if (!formData.has('title')) {
            api = state.modal.title === 'Edit Item' ? state.modal.item.url : ITEMS_API
            const active_list = state.lists.filter(list => list.url === state.active_list)[0]
            const item = formData.get('item')
            formData.set('title', item)
            formData.set('list', active_list.id)
            formData.delete('item')            
        }

        const fetch_func = (state.modal.title === 'Edit Item' || state.modal.title === 'Edit List') ? axios.put : axios.post
        fetch_func(api, formData)
        .then(response => {
            const item = response.data
            if (formData.has('list')) {
                if (state.modal.title === 'Edit Item') {
                    const index = state.list.items.findIndex(element => element.url === item.url)
                    state.list.items[index] = item
                } else {
                    state.list.items.unshift(item)
                }
            } else {
                if (state.modal.title === 'Edit List') {
                    const index = state.lists.findIndex(list => list.url === item.url)
                    state.lists[index] = item
                } else {
                    state.lists.unshift(item)
                }
            }
            close()
        })
        .catch(error => setFormState({...formState, error: error.message}))
    }

    function close() {
        setState({...state, modal: {open: false, new_item: false, title: '', item: {}}})
        setFormState({...formState, error: ''})
    }

    const modalState = state.modal
    return (
        <Modal isOpen={ modalState.open } toggle={ close }>
            <ModalHeader toggle={ close }>{ modalState.title }</ModalHeader>
            <Form onSubmit={ submit }>
                <ModalBody>
                    { formState.error && <Alert color="danger">{ formState.error }</Alert>}
                    { !modalState.new_item && <FormGroup><CustomInput type='text' placeholder='Title' name='title' defaultValue={ modalState.item.title } required /></FormGroup> }
                    { modalState.new_item && <FormGroup><CustomInput type='text' placeholder='Item' name='item' defaultValue={ modalState.item.title } required /></FormGroup> }
                    { modalState.new_item && <FormGroup><CustomInput type='number' min='0' placeholder='Quantity' name='qty' step='1' defaultValue={ modalState.item.qty } required /></FormGroup> }
                    { modalState.new_item && <FormGroup><CustomInput type='number' min='0' placeholder='Price' name='price' step='0.01' defaultValue={ modalState.item.price } required /></FormGroup> }
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color='primary'>Submit</Button>
                    <Button color='danger' onClick={ close }>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default ModalForm