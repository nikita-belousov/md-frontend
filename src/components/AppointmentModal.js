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
  renderForm() {
    return (
      <form className={styles['form']}>
        <div className={styles['input-group']}>
          <div className={styles['input-row']}>
            <div className={styles['label']}>
              <div className={styles['label-text']}>
                Имя
              </div>
            </div>
            <div className={styles['field']}>
              <div className={styles['tiny-wrapper']}>
                <TextInput name='name' />
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
            />
          </div>
        </div>
      </form>
    )
  }

  renderSucceess() {
    const text = SUCCESS_TEXT.replace(
      '%username%',
      this.state.inputData.name.trim()
    )

    return <Paragraph type='small'>{text}</Paragraph>
  }

  renderFooter = () => {
    return (
      <div className={styles['footer-wrapper']}>
        <Button
          width='10em'
          successText='Вы записаны'
        >
          Записаться
        </Button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Form>
          <Modal
            heading={'Запись на прием'}
            renderFooter={this.renderFooter}
            onClose={this.props.onClose}
          >
            {this.renderForm()}
          </Modal>
        </Form>
      </div>
    )
  }
}

export default AppointmentModal
