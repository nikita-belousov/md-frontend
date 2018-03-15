import React from 'react'
import FeedbackResponse from './FeedbackResponse'
import styles from './../styles/components/Questions.css'
import withFetch from './HOCs/withFetch'

const Questions = ({ fetchedData }) => {
  return (
    <div>
      {fetchedData.map(question =>
        <div
          key={question.id}
          className={styles['question-wrapper']}
        >
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
