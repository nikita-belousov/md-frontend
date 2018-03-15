import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NarrowPage from './../pages/NarrowPage'

const withFetch = (WrappedComponent) => {
  class Enhancement extends Component {
    constructor(props) {
      super(props)
      this.state = { fetchedData: [] }
      this.getData(this.props.api)
    }

    componentWillReceiveProps(nextProps) {
      this.getData(nextProps.api)
    }

    getData(api) {
      fetch(`${process.env.REACT_APP_API_ROOT}/${api}`)
        .then(data => data.json())
        .then(json => this.setState({ fetchedData: json }))
        .catch(console.log)
    }

    render() {
      if (!this.state.fetchedData.length > 0) return null

      const { api, ...restProps } = this.props
      const { fetchedData } = this.state

      return (
        <WrappedComponent
          fetchedData={(fetchedData.length > 1)
            ? fetchedData
            : fetchedData[0]}
          {...restProps}
        />
      )
    }
  }

  return Enhancement
}

export default withFetch
