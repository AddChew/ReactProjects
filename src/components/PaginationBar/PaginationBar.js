import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Pagination, PaginationItem } from '@bootstrap-styled/v4'

const PaginationBarWrapper = styled.div`
    font-size: 0.9rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 1.5rem;
`

const PaginationWrapper = styled(Pagination)`
    margin: 0rem;
`

const PaginationItemWrapper = styled(PaginationItem)`
    margin-right: 0.35rem;
`

const PaginationLinkWrapper = styled(Link)`
    text-decoration: none;
    color: ${props => props.active === 'true' ? `#ffffff !important;` : `#000000 !important;`}
    padding: 0.25rem 0.5rem !important;
    border: 1px solid ${props => props.active === 'true' ? `#f48225 !important;` : `#d6d9dc !important;`}
    border-radius: 3px !important;
    background-color: ${props => props.active === 'true' ? '#f48225 !important;' : '#ffffff;'}

    :hover {
        border-color: ${props => props.active === 'true' ? '#f48225' : '#babfc4'};
        background-color: ${props => props.active === 'true' ? '#f48225' : '#d6d9dc'};
    }
`

const PerPageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.5rem;   
`

function Page({ active, to, page }) {
    return (
        <PaginationItemWrapper>
            <PaginationLinkWrapper active={ active } to={ to }>{ page }</PaginationLinkWrapper>
        </PaginationItemWrapper>        
    )
}

function PaginationBar({ page, pagesize, last_page }) {
    const pagesizes = [15, 30, 50]
    return (
        <PaginationBarWrapper>
            <PaginationWrapper>
                { page > 1 && <Page to={ `/?page=${page - 1}&pagesize=${pagesize}` } page={ 'Prev' } /> }
                { page > 1 && <Page to={ `/?page=${page - 1}&pagesize=${pagesize}` } page={ page - 1 } /> }
                <Page active={ 'true' } to={ `/?page=${page}&pagesize=${pagesize}` } page={ page } />
                { !last_page && <Page to={ `/?page=${page + 1}&pagesize=${pagesize}` } page={ page + 1 } /> }
                { !last_page && <Page to={ `/?page=${page + 1}&pagesize=${pagesize}` } page={ 'Next' } /> }
            </PaginationWrapper>
            <div>
                <PaginationWrapper>
                    { pagesizes.map(size => <Page key={ size } active={ `${size === pagesize}` } to={ `/?page=${page}&pagesize=${size}` } page={ size } />)}
                    <PerPageWrapper>per page</PerPageWrapper>
                </PaginationWrapper>
            </div>
        </PaginationBarWrapper>
    )
}

export default PaginationBar