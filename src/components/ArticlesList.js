import React from 'react'
import styles from './../styles/components/ArticlesList.css'
import { withFetch } from './../HOCs'
import { Article } from './Article'

const ArticlesList = ({ dataArticles }) => (
  <div>
    {dataArticles.map(data =>
      <div className={styles['article-wrapper']}>
        <Article {...data} />
      </div>
    )}
  </div>
)

export default withFetch(ArticlesList)
