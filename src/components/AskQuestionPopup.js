import React, { Component } from 'react'
import validate from 'validate.js'
import styles from './../styles/components/AskQuestionPopup.css'

import FontAwesome from 'react-fontawesome'
import Form from './containers/Form'
import TextInput from './common/TextInput'
import Paragraph from './common/Paragraph'
import Button from './common/Button'
import RatingInput from './common/RatingInput'
import Popup from './Popup'

class AskQuestionPopup extends Component {
  onFormSubmit = (data) => {
    fetch(`${process.env.REACT_APP_API_ROOT}/question`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...data,
        answer: 'empty'
      })
    })
  }

  render() {
    const constraints = {
      question: {
        presence: { allowEmpty: false }
      }
    }

    return (
      <div className={styles['wrapper']}>
        <Popup {...this.props}>
          <Form
            withLoading
            loadingTime={2500}
            onSubmit={this.onFormSubmit}
            constraints={constraints}
          >
            <TextInput
              alt
              type='textarea'
              rows={4}
              label='Вопрос'
              name='question'
            />
            <Paragraph type='small' >
              Ответ на ваш вопрос будет опубликован в течение суток.
            </Paragraph>
            <Button
              formSubmit
              type='popup'
              successText='Спасибо!'
            >
              Отправить
            </Button>
          </Form>
        </Popup>
      </div>
    )
  }
}

export default AskQuestionPopup
