import React from 'react'
import styles from './../../styles/components/Article.css'
import { Paragraph } from './../common'
import FontAwesome from 'react-fontawesome'

const Article = ({
  url,
  datePublished,
  title,
  text,
  views
}) => (
  <div className={styles['article']}>
    <div className={styles['caption']}>
      <div className={styles['date']}>
        {utils.formatDate(datePublished)}
      </div>
      <div className={styles['views']}>
        <span className={styles['eye-icon']}>
          <FontAwesome name='eye' />
        </span>
        {views}
      </div>
    </div>
    <div className={styles['text']}>
      <Paragraph>
        {text}
      </Paragraph>
    </div>
  </div>
)

export default Article
