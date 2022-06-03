import React from 'react'
import styled from 'styled-components'
import { FormGroup, Input } from '@bootstrap-styled/v4'

const CustomInput = styled(Input)`
    box-sizing: border-box;
`

const FormItem = ({ name, type = 'text', placeholder = '', value = ''}) => (
    <FormGroup>
        <CustomInput type={ type } name={ name } defaultValue={ value } placeholder={ placeholder } />
    </FormGroup>
)

export default FormItem