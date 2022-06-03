import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Head } from '../App'
import SubHeader from '../../components/Header/SubHeader'
import FormItem from '../../components/FormItem/FormItem'
import { Form, Button } from '@bootstrap-styled/v4'

const FormWrapper = styled.div`
    padding: 1rem;
`

const ItemForm = () => {
    const { id } = useParams()
    return (
        <>
        <Head title='Add Item' />
        <SubHeader goBack={ `/list/${id}` } title='Add Item'></SubHeader>
        <FormWrapper>
            <Form>
                <FormItem name='item' placeholder='Item'/>
                <FormItem name='qty' type='number' placeholder='Quantity'/>
                <FormItem name='price' type='number' placeholder='Price'/>
                <Button type='submit'>Add Item</Button>
            </Form>
        </FormWrapper>
        </>
    )
}

export default ItemForm