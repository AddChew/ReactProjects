import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import List from '../../components/List/List'
import Link from '../../components/Link/Link'

const ProfileWrapper = styled.div`
    width: 50%;
    margin: 10px auto;
`

const Avatar = styled.img`
    width: 150px;    
`

function Profile({ username }) {
    const [state, setState] = useState({data: {}, repositories: [], loading: true, error: ''})

    function fetchProfile() {
        fetch(`https://api.github.com/users/${username}`)
        .then(profile => profile.json())
        .then(profileJSON => {
            if (profileJSON.message === undefined) {
                fetch(profileJSON.repos_url)
                .then(repos => repos.json())
                .then(reposJSON => setState({...state, data: profileJSON, repositories: reposJSON, loading: false}))
                .catch(error => setState({...state, loading: false, error: error.message}))
            }
        })
        .catch(error => {
            setState({...state, loading: false, error: error.message})
        })
    }

    useEffect(fetchProfile, [])

    const {data, repositories, loading, error} = state
    if (loading || error) return <div>{ loading ? 'Loading...' : error }</div>

    const items = [
        {label: 'Github Profile:', value: <Link url={ data.html_url } title="Github URL" />},
        {label: 'Name:', value: data.name},
        {label: 'Company:', value: data.company},
        {label: 'Location:', value: data.location},
        {label: 'Email:', value: data.email},
        {label: 'Bio:', value: data.bio}
    ]
    const projects = repositories.map(repository => ({label: repository.name, value: <Link url={ repository.html_url } title="Github URL" />}))
    return (
        <ProfileWrapper>
            <Avatar src={ data.avatar_url } alt="avatar" />
            <List title="Profile" items={ items } />
            <List title="Repositories" items={ projects} />
        </ProfileWrapper>
    )
}

export default Profile