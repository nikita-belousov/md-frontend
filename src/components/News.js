import React from 'react'
import styles from './../styles/components/News.css'
import withFetch from './HOCs/withFetch'
import Paragraph from './common/Paragraph'
import Link from './common/Link'

const News = ({ fetchedData }) => (
  <div>
    {fetchedData.map(entity => {
      let preview
      if (entity.previewPicture) {
        preview = require(`./../assets/images/news/${entity.previewPicture}`)
      }

      return (
        <div
          key={entity.id}
          className={styles['news-entity']}
        >
          <div className={styles['columns']}>
            <div className={styles['side']}>
              <Link href={`/news/${entity.url}`}>
                <div
                  className={styles['preview-picture']}
                  style={{ backgroundImage: preview ? `url(${preview})` : null }}
                />
              </Link>
            </div>
            <div className={styles['news-content']}>
              <div className={styles['headline-link']}>
                <Link href={`/news/${entity.url}`}>
                  {entity.heading}
                </Link>
              </div>
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
          </div>
        </div>
      )
    })}
  </div>
)

export default withFetch(News)
