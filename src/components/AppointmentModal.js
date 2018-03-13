import React, { Component } from 'react'
import validate from 'validate.js'
import _ from 'lodash'
import styles from './../styles/components/AppointmentModal.css'

import Form from './containers/Form'
import Modal from './Modal'
import Button from './common/Button'
import TextInput from './common/TextInput'
import Select from './common/Select'
import Paragraph from './common/Paragraph'

const doctorsOptions = [
  { name: 'Не выбрано', value: '' },
  { name: 'Юров Р.В. (ортопед)', value: 'yurov' },
  { name: 'Мальнева Н.С. (терапевт)', value: 'malneva' },
  { name: 'Королев Ю.Л. (хирург)', value: 'korolev' },
  { name: 'Кожухова Е.П. (терапевт)', value: 'kozhuhova' },
  { name: 'Ковалев С.В. (терапевт)', value: 'kovalev' },
  { name: 'Кяргина Н.Н. (ортодонт)', value: 'kyargina' }
]

const LOADING_TIME = 2500
const SUCCESS_TEXT = 'Спасибо, %username%! Через несколько минут с вами свяжется администратор клиники для уточнения деталей приема.'

class AppointmentModal extends Component {
  state = {
    contentState: 'form' // or 'success'
  }

  onFormSubmit = (data) => {
    let doctor
    if (data.doctor) {
      doctor = doctorsOptions
        .find(doc => doc.value === data.doctor)
        .name
    }

    const emailData = {
      name: _.capitalize(data.name),
      phone: data.phone,
      problem: data.problem,
      doctor: doctor || 'не указано'
    }

    emailjs.send(process.env.REACT_APP_MAIL_SERVICE, '_appointment', emailData)
      .then(console.log)
      .catch(console.log)

    this.userName = data.name
    setTimeout(() => {
      this.setState({ contentState: 'success' })
    }, LOADING_TIME)
  }

  renderSuccess() {
    const text = SUCCESS_TEXT.replace(
      '%username%',
      _.capitalize(this.userName.trim())
    )

    return (
      <div className={styles['success-text']}>
        <Paragraph type='small'>
          {text}
        </Paragraph>
      </div>
    )
  }

  renderForm() {
    const textConstraints = {
      presence: {
        allowEmpty: false
      }
    }
    const phoneConstraints = {
      presence: {
        allowEmpty: false
      },
      format: /\+7 \(9\d{2}\) \d{3} \d{2} \d{2}/
    }

    return (
      <div className={styles['form']}>
        <div className={styles['input-group']}>
          <div className={styles['input-row']}>
            <div className={styles['label']}>
              <div className={styles['label-text']}>
                Имя
              </div>
            </div>
            <div className={styles['field']}>
              <div className={styles['tiny-wrapper']}>
                <TextInput
                  name='name'
                  constraints={textConstraints}
                />
              </div>
            </div>
          </div>
          <div className={styles['input-row']}>
            <div className={styles['label']}>
              <div className={styles['label-text']}>
                Номер телефона
              </div>
            </div>
            <div className={styles['field']}>
              <div className={styles['tiny-wrapper']}>
                <TextInput
                  type='tel'
                  name='phone'
                  mask="+7 (999) 999 99 99"
                  maskChar="_"
                  constraints={phoneConstraints}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles['input-row']}>
          <div className={styles['label']}>
            <div className={styles['label-text']}>
              Врач
            </div>
            <div className={styles['label-caption']}>
              опционально
            </div>
          </div>
          <div className={styles['field']}>
            <div className={styles['tiny-wrapper']}>
              <Select
                name='doctor'
                options={doctorsOptions}
              />
            </div>
          </div>
        </div>
        <div className={styles['input-row']}>
          <div className={styles['label']}>
            <div className={styles['label-text']}>
              Опишите в чем состоит ваша проблема
            </div>
          </div>
          <div className={styles['field']}>
            <TextInput
              type='textarea'
              name='problem'
              rows='5'
              constraints={textConstraints}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Modal
        heading={'Запись на прием'}
        onClose={this.props.onClose}
      >
        <Form
          withLoading
          onSubmit={this.onFormSubmit}
          loadingTime={LOADING_TIME}
        >
          {this.state.contentState === 'form'
            ? this.renderForm()
            : this.renderSuccess()}
          <Button
            formSubmit
            width='10em'
            successText='Вы записаны'
          >
            Записаться
          </Button>
        </Form>
      </Modal>
    )
  }
}

export default AppointmentModal
