import React from 'react'
import styles from './../styles/components/ArticlesList.css'
import { withFetch } from './HOCs'

const ArticlesList = ({ dataArticles }) => (
  <div>
    {dataArticles.map(data =>
      <div className={styles['article-wrapper']}>
        {data.title}
      </div>
    )}
  </div>
)

export default withFetch(ArticlesList)
