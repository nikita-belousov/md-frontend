import React from 'react'
import styles from './../styles/components/Questions.css'
import withFetch from './HOCs/withFetch'
import Paragraph from './common/Paragraph'

const News = ({ fetchedData }) => (
  <div>
    {fetchedData.map(entity =>
      <div className={styles['entity-wrapper']}>
        <h4>
          {entity.heading}
        </h4>
        <div className={styles['date']}>
          {new Date(entity.datePublished).toLocaleDateString(
            'ru-RU',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }
          )}
        </div>
        <Paragraph>
          {entity.text}
        </Paragraph>
      </div>
    )}
  </div>
)

export default withFetch(News)
