import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NarrowPage from './../pages/NarrowPage'

const withFetch = (WrappedComponent) => {
  class Enhancement extends Component {
    constructor(props) {
      super(props)
      this.state = { fetchedData: null }
      this.getData()
    }

    getData() {
      fetch(process.env.REACT_APP_API_ROOT + this.props.api)
        .then(data => data.json())
        .then(json => {
          if (json.statusCode === 404) {
            this.context.onPageNotFound()
          } else {
            this.setState(prev => ({ fetchedData: json }))
          }
        })
    }

    renderNotFound() {
      return (
        <NarrowPage heading='Упс...'>
          Страница по вашему запросу не найдена :(
        </NarrowPage>
      )
    }

    render() {
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
