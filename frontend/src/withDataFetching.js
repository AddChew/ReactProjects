import React from 'react'
import axios from 'axios'

const withDataFetching = props => WrappedComponent => {
  class WithDataFetching extends React.Component {
    constructor() {
      super()
      this.state = {
        data: [],
        loading: false,
        error: '',
      }
    }

    async componentDidMount() {
      try {
        const response = await axios.get(props.dataSource)
        this.setState({
          data: response.data.results,
          loading: false,
        })
      } catch (error) {
        this.setState({
          loading: false,
          error: error.message,
        })
      }
    }

    render() {
      const { data, loading, error } = this.state

      return (
        <WrappedComponent
          data={data}
          loading={loading}
          error={error}
          {...this.props}
        />
      )
    }
  }

  WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`

  return WithDataFetching
}

export default withDataFetching