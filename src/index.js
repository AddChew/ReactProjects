import React from 'react'
import { createRoot } from 'react-dom/client'
import List from './containers/List'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <div className='container-fluid'>
            <nav className='navbar sticky-top navbar-light bg-dark px-3'>
                <h1 className='navbar-brand text-light'>Movie List</h1>
            </nav>
            <List />
        </div>
    )
}

const root = createRoot(document.querySelector("#root"))
root.render(<App />)