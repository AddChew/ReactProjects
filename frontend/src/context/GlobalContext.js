import React from 'react'
import ListContextProvider from "./ListContextProvider"
import ListsContextProvider from "./ListsContextProvider"

const GlobalContext = ({ children }) => {
    return (
        <ListsContextProvider>
            <ListContextProvider>
                { children }
            </ListContextProvider>
        </ListsContextProvider>
    )
}

export default GlobalContext