import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NarrowPage from './../pages/NarrowPage'

const withFetch = (WrappedComponent) => {
  class Enhancement extends Component {
    constructor(props) {
      super(props)
      this.state = { fetchedData: null }
      this.getData(this.props.api)
    }

    componentWillReceiveProps(nextProps) {
      this.getData(nextProps.api)
    }

    getData(api) {
      return fetch(`${process.env.REACT_APP_API_ROOT}/${api}`)
        .then(data => data.json())
        .then(json => this.setState({ fetchedData: json }))
        .catch(console.log)
    }

    renderNotFound() {
      return (
        <NarrowPage heading='Упс...'>
          Страница по вашему запросу не найдена :(
        </NarrowPage>
      )
    }

    render() {
      const { fetchedData } = this.state
      if (!fetchedData) return null

      const { api, ...restProps } = this.props
      return (
        <WrappedComponent
          fetchedData={this.state.fetchedData}
          {...restProps}
        />
      )
    }
  }

  Enhancement.contextTypes = {
    onPageNotFound: PropTypes.func
  }

  return Enhancement
}

export default withFetch
