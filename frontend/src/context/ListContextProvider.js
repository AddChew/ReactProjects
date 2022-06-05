import { createContext, useReducer } from 'react'
import axios from 'axios'
import LISTS_API from '../api/Lists'
import ITEMS_API from '../api/Items'

export const ListContext = createContext()

const initialValue = {
    list: [],
    loading: true,
    error: ''
}

const reducer = (value, action) => {
    switch (action.type) {
        case 'GET_LIST_SUCCESS':
            return {
                ...value,
                list: action.payload,
                loading: false,
            }
        
        case 'GET_LIST_ERROR':
            return {
                ...value,
                list: [],
                loading: false,
                error: action.payload
            }

        case 'ADD_ITEM_SUCCESS':
            return {
                ...value,
                list: { ...value.list, items: [...value.list.items, action.payload] },
                loading: false
            }
        
        case 'ADD_ITEM_ERROR':
            return {
                ...value,
                loading: false,
                error: 'Something went wrong...'
            }

        default:
            return value
    }
}

async function fetchList(dataSource) {
    try {
        const response = await axios.get(dataSource)
        return { data: response.data, error: ''}
    } catch(error) {
        return { data: [], error: error.message }
    }
}

async function postItem(dataSource, item) {
    try {
        const response = await axios.post(dataSource, item)
        return { data: response.data, error: '' }
    } catch(error) {
        return { data: [], error: error.message }
    }
}

const ListContextProvider = ({ children }) => {
    const [ value, dispatch ] = useReducer(reducer, initialValue)

    const getListRequest = async id => {
        const result = await fetchList(`${LISTS_API}${id}`)
        if (result.data) {
            dispatch({ type: 'GET_LIST_SUCCESS', payload: result.data })
        } else {
            dispatch({ type: 'GET_LIST_ERROR', payload: result.error })
        }
    }

    const addItemRequest = async item => {
        const result = await postItem(ITEMS_API, item)
        if (result.data) {
            dispatch({ type: 'ADD_ITEM_SUCCESS', payload: result.data })
        } else {
            dispatch({ type: 'ADD_ITEM_ERROR' })
        }
    }

    return (
        <ListContext.Provider value={ { ...value, getListRequest, addItemRequest } }>
            { children }
        </ListContext.Provider>
    )
}

export default ListContextProvider