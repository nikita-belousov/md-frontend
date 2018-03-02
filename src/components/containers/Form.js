import React, { Component } from 'react'
import { validate as validateJS } from 'validate.js'
import _ from 'lodash'
import { recursiveReactMap } from '../../utils'

import TextInput from './../common/TextInput'
import Select from './../common/Select'
import Checkbox from './../common/Checkbox'
import Button from './../common/Button'

const INPUT_TYPES = [TextInput, Checkbox, Select]

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitalState()
  }

  getInitalState() {
    let state = {
      inputData: {},
      errors: [],
      submitEnabled: null,
      submittingState: null
    }

    recursiveReactMap(this.props.children, child => {
      if (INPUT_TYPES.includes(child.type)) {
        state = {
          ...state,
          inputData: {
            ...state.inputData,
            [child.props.name]: ''
          }
        }
      }
    })

    return state
  }

  renderChildren() {
    return recursiveReactMap(this.props.children, child => {
      if (INPUT_TYPES.includes(child.type)) {
        const newProps = {
          onChange: this.updateInputData,
          value: this.state.inputData[child.props.name]
        }
        return React.cloneElement(child, newProps)
      }
      return child
    })
  }

  submit = () => {
    // send stuff

    this.setState(prev => ({
      ...prev,
      submittingState: 'pending'
    }), setTimeout(() => {
      this.setState(prev => ({
        ...prev,
        submittingState: 'submitted'
      }))
    }, 2500))
  }

  validate = () => {
    const { inputData, submitEnabled } = this.state

    const result = validateJS(inputData, this.constraints)
    if (result && submitEnabled) {
      this.disableSubmit()
    } else if (!result && !submitEnabled) {
      this.enableSubmit()
    }
  }

  enableSubmit() {
    this.setState(prev => ({
      ...prev,
      submitEnabled: true
    }))
  }

  disableSubmit() {
    this.setState(prev => ({
      ...prev,
      submitEnabled: false
    }))
  }

  updateInputData = (e) => {
    const { name, value } = e.target

    this.setState(prev => ({
      ...prev,
      inputData: {
        ...prev.inputData,
        [name]: value
      }
    }), this.validate)
  }

  onInputFocus = (e) => {
    const { name } = e.target

    if (this.state.errors.includes(name)) {
      this.setState(prev => ({
        ...prev,
        errors: _.filter(prev.errors, n => n !== name)
      }))
    }
  }

  render() {
    return (
      <div>
        {this.renderChildren()}
      </div>
    )
  }
}

export default Form
