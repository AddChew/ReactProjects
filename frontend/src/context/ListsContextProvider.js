import { createContext, useReducer } from 'react'
import axios from 'axios'
import LISTS_API from '../api/Lists'

export const ListsContext = createContext()

const initialValue = {
    lists: [],
    loading: true,
    error: ''
}

const reducer = (value, action) => {
    switch (action.type) {
        case 'GET_LISTS_SUCCESS':
            return {
                ...value,
                lists: action.payload,
                loading: false,
            }
        
        case 'GET_LISTS_ERROR':
            return {
                ...value,
                lists: [],
                loading: false,
                error: action.payload
            }
        
        default:
            return value
    }
}

async function fetchLists(dataSource) {
    try {
        const response = await axios.get(dataSource)
        return { data: response.data.results, error: ''}
    } catch(error) {
        return { data: [], error: error.message }
    }
}

const ListsContextProvider = ({ children }) => {
    const [ value, dispatch ] = useReducer(reducer, initialValue)

    const getListsRequest = async () => {
        const result = await fetchLists(LISTS_API)
        if (result.data && result.data.length) {
            dispatch({ type: 'GET_LISTS_SUCCESS', payload: result.data })
        } else {
            dispatch({ type: 'GET_LISTS_ERROR', payload: result.error })
        }
    }

    return (
        <ListsContext.Provider value={ { ...value, getListsRequest } }>
            { children }
        </ListsContext.Provider>
    )
}

export default ListsContextProvider