import React from 'react'
import axios from 'axios'

export default function WithDataFetching(WrappedComponent) {
    class WithDataFetching extends React.Component {
        constructor(props) {
            super(props)
            this.state = {data: [], loading: true, error: ''}
        }

        async componentDidMount() {
            try {
                const response = await axios.get(this.props.dataSource)
                this.setState({...this.state, data: response.data, loading: false})
            } catch(error) {
                this.setState({...this.state, loading: false, error: error.message})
            }
        }

        render() {
            const { data, loading, error } = this.state
            return <WrappedComponent data={ data } loading={ loading } error={ error } />
        }
    }

    WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`
    return WithDataFetching
}