import styled from 'styled-components'
import { Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Input, Alert } from '@bootstrap-styled/v4'

import GreenButton from '../../components/Button/GreenButton'
import WhiteButton from '../../components/Button/WhiteButton'

const ReviewModal = styled(Modal)`
    div.modal-dialog, div.modal-content {
        border-radius: 0.5rem;
    } 
`

const ReviewHeader = styled(ModalHeader)`
    h4 {
        font-size: 1.25rem;
    }
`

const ReviewBody = styled(ModalBody)`
    padding-top: 0rem !important;
`

const ReviewFooter = styled(ModalFooter)`
    justify-content: space-between !important;
`

const CustomInput = styled(Input)`
    box-sizing: border-box;
    font-size: 0.875rem !important;
`

const ReviewForm = ({ state, setState, hotel }) => {
    const submit = (event) => {
        event.preventDefault()
        console.log('Submit form')
        close()
    }

    const close = () => {
        setState({ ...state, modalOpen: false })
    }

    return (
        <ReviewModal isOpen={ state.modalOpen }>
            <ReviewHeader toggle={ close }>Leave A Review</ReviewHeader>
            <Form onSubmit={ submit }>
                <ReviewBody>
                    <FormGroup>How was your stay at { hotel.title }?</FormGroup>
                    <FormGroup><CustomInput type='text' placeholder='Title of your review' required></CustomInput></FormGroup>
                    <FormGroup><CustomInput type='textarea' placeholder='Write a review' required></CustomInput></FormGroup>
                </ReviewBody>
                <ReviewFooter>
                    <WhiteButton type='button' onClick={ close }>Cancel</WhiteButton> 
                    <GreenButton type='submit'>Submit</GreenButton>
                </ReviewFooter>
            </Form>
        </ReviewModal>
    )
}

export default ReviewForm