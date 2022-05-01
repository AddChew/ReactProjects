import React, { useState, useEffect } from 'react'
import Card from '../components/Card/Card'

function List() {
    const [state, setState] = useState({data: [], loading: true})

    function fetchMovies() {
        fetch('assets/data.json')
        .then(movies => movies.json())
        .then(moviesJSON => setState({data: moviesJSON, loading: false}))
    }

    useEffect(fetchMovies, [])

    const { data, loading } = state
    if (loading) return <div>Loading...</div>
    return (
        <div className='row justify-content-between'>
            { data.map(movie =>
                <div key={ movie.id } className="col-sm-2">
                    <Card movie={ movie }/>
                </div>    
            ) }
        </div>
    )
}

export default List