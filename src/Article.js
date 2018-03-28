import React from 'react'
import styles from './../styles/components/Article.css'

const Article = ({
  id,
  url,
  previewPicture,
  datePublished
}) => {
  const thumbnail = previewPicture
    ? require(`./../assets/images/news/${previewPicture}`)
    : undefined

  return (
    <div
      key={entity.id}
      className={styles['article-entity']}
    >
      <div className={styles['columns']}>
        <div className={styles['side']}>
          <Link href={`/article/${thumbnail}`}>
            <NewsPreviewPicture url={preview} />
          </Link>
        </div>
        <div className={styles['article-content']}>
          <div className={styles['headline-link']}>
            <Link href={`/article/${entity.url}`}>
              {entity.heading}
            </Link>
          </div>
          <div className={styles['date']}>
            {utils.formatDate(datePublished)}
          </div>
          <Paragraph>
            {entity.text}
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

export default Article
