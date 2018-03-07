import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NarrowPage from './../pages/NarrowPage'

const withFetch = (WrappedComponent) => {
  class Enhancement extends Component {
    static contextTypes = {
      onPageNotFound: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = { fetchedData: [] }
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
      if (!this.state.fetchedData.length > 0) return null

      const { api, ...restProps } = this.props

      return (
        <WrappedComponent
          fetchedData={this.state.fetchedData}
          {...restProps}
        />
      )
    }
  }

  return Enhancement
}

export default withFetch
