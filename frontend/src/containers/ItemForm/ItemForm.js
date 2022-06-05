import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Head } from '../App'
import SubHeader from '../../components/Header/SubHeader'
import FormItem from '../../components/FormItem/FormItem'
import { Form, Button } from '@bootstrap-styled/v4'
import { ListContext } from '../../context/ListContextProvider'

const FormWrapper = styled.div`
    padding: 1rem;
`

const ItemForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addItemRequest } = useContext(ListContext)

    const addItem = event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        formData.set('list', id)
        addItemRequest(formData)
        navigate(`/list/${id}`)
    }

    return (
        <>
        <Head title='Add Item' />
        <SubHeader goBack={ `/list/${id}` } title='Add Item'></SubHeader>
        <FormWrapper>
            <Form onSubmit={ addItem }>
                <FormItem name='title' placeholder='Item' required />
                <FormItem name='qty' type='number' min='0' step='1' placeholder='Quantity' required />
                <FormItem name='price' type='number' min='0' step='0.01' placeholder='Price' required />
                <Button type='submit' color='primary'>+ Add Item</Button>
            </Form>
        </FormWrapper>
        </>
    )
}

export default ItemForm