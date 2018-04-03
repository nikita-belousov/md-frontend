import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NarrowPage from './../pages/NarrowPage'

const withFetch = (WrappedComponent, options) => {
  class Enhancement extends Component {
    static contextTypes = {
      onPageNotFound: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = { fetchedData: [] }

      if (options) {
        this.getData(options.api, options.query)
      } else {
        this.getData(props.api, props.query)
      }
    }

    componentWillReceiveProps(nextProps) {
      this.getData(nextProps.api, nextProps.query)
    }

    getData(api, query = '') {
      fetch(process.env.REACT_APP_API_ROOT + `/${api}` + query)
        .then(data => data.json())
        .then(json => {
          if (([404, 500].includes(json.statusCode)) && (this.props.handleNotFound)) {
            this.context.onPageNotFound()
          } else {
            this.setState({ fetchedData: json })
          }
        })
    }

    render() {
      if (!this.state.fetchedData.length > 0) return null

      const { query, ...restProps } = this.props
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
