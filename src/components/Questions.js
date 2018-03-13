import React from 'react'
import FeedbackResponse from './FeedbackResponse'
import styles from './../styles/components/Questions.css'
import withFetch from './HOCs/withFetch'

const Questions = (props) => {
  console.log(1)

  return (
    <div>
      {props.fetchedData.map(question =>
        <div className={styles['question-wrapper']}>
          <div className={styles['author-name']}>
            <b>{question.author}</b>
            {' '}
            {'спрашивает:'}
          </div>
          <FeedbackResponse
            hideResponse={true}
            feedback={question.question}
            response={question.answer}
          />
        </div>
      )}
    </div>
  )
}

export default withFetch(Questions)
