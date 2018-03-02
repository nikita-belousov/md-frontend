import React, { Component } from 'react'
import validate from 'validate.js'
import styles from './../styles/components/CallbackPopup.css'

import FontAwesome from 'react-fontawesome'
import TextInput from './common/TextInput'
import Paragraph from './common/Paragraph'
import Button from './common/Button'
import Popup from './Popup'

console.log(process.env.REACT_APP_MAIL_SERVICE)

class CallbackPopup extends Component {
  state = {
    inputData: {
      name: '',
      phone: ''
    },
    submitEnabled: false,
    submitted: false
  }

  constraints = {
    name: {
      presence: { allowEmpty: false }
    },
    phone: {
      presence: { allowEmpty: false },
      format: /\+7 \(9\d{2}\) \d{3} \d{2} \d{2}/
    }
  }

  submit = () => {
    const { name, phone } = this.state.inputData

    emailjs.send("yandex", "_callback", {"name":"ad","phone":"sadasd"})
    
    .then(res => console.log(res))
    .catch(err => console.log(err))

    this.setState(prev => ({
      ...prev,
      submitted: true
    }))
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

  renderButton = () => {
    const { submitEnabled, submitted } = this.state

    return (
      <Button
        type='popup'
        onClick={submitEnabled && this.submit}
        loadSuccess={submitted}
        successText='Ждите звонка'
        loadingTime={2500}
        disabled={!submitEnabled}
      >
        Перезвонить
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
          <div className={styles['inner']}>
            <TextInput
              alt
              label='Имя'
              name='name'
              value={inputData.name}
              onChange={this.updateInputData}
            />
            <TextInput
              alt
              label='Телефон'
              type='tel'
              name='phone'
              value={inputData.phone}
              onChange={this.updateInputData}
              mask="+7 (\999) 999 99 99"
              maskChar="_"
            />
            <div className={styles['p-wrapper']}>
              <Paragraph type='small'>
                Администратор клиники свяжется с вами в течение пяти минут.
              </Paragraph>
            </div>
          </div>
        </Popup>
      </div>
    )
  }
}

export default CallbackPopup
