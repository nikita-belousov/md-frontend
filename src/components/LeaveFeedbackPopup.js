import React, { Component } from 'react'
import validate from 'validate.js'
import styles from './../styles/components/LeaveFeedbackPopup.css'

import FontAwesome from 'react-fontawesome'
import TextInput from './common/TextInput'
import Paragraph from './common/Paragraph'
import Button from './common/Button'
import RatingInput from './common/RatingInput'
import Popup from './Popup'

class LeaveFeedbackPopup extends Component {
  state = {
    inputData: {
      name: '',
      rating: null,
      review: '',
    },
    submitEnabled: false,
    submittingState: null
  }

  constraints = {
    name: {
      presence: { allowEmpty: false }
    },
    rating: {
      presence: { allowEmpty: false }
    },
    review: {
      presence: { allowEmpty: false },
    }
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

    const result = validate(inputData, this.constraints)
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

  updateInputData = (name, value) => {
    this.setState(prev => ({
      ...prev,
      inputData: {
        ...prev.inputData,
        [name]: value
      }
    }), this.validate)
  }

  handleTextInputChange = (e) => {
    const { name, value } = e.target
    this.updateInputData(name, value)
  }

  renderButton = () => {
    const { submitEnabled, submittingState } = this.state

    let btnState = 'normal'
    switch(submittingState) {
      case 'pending':
        btnState = 'loading'
        break
      case 'submitted':
        btnState = 'finished'
        break
    }

    return (
      <Button
        type='popup'
        btnState={btnState}
        onClick={submitEnabled && this.submit}
        state={submittingState}
        successText='Спасибо!'
        disabled={!submitEnabled}
      >
        Отправить
      </Button>
    )
  }

  render() {
    const { inputData, errors } = this.state

    return (
      <div className={styles['wrapper']}>
        <Popup
          renderButton={this.renderButton}
          {...this.props}
        >
          <div className={styles['name-input']}>
            <TextInput
              alt
              label='Имя'
              name='name'
              value={inputData.name}
              onChange={this.handleTextInputChange}
            />
          </div>
          <TextInput
            alt
            type='textarea'
            rows={4}
            label='Отзыв'
            name='review'
            value={inputData.review}
            onChange={this.handleTextInputChange}
          />
          <div className={styles['rating-input']}>
            <RatingInput
              label='Ваша оценка'
              initialRating={inputData.rating}
              onChange={value => this.updateInputData('rating', value)}
            />
          </div>
          <Paragraph type='small' >
            Ваш отзыв будет опубликован в течение суток.
          </Paragraph>
        </Popup>
      </div>
    )
  }
}

export default LeaveFeedbackPopup
