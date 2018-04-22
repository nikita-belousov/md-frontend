import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NarrowPage from './../pages/NarrowPage'

const withFetch = WrappedComponent => {
  return class extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default withFetch
