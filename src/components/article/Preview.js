import React, { Component } from 'react'
import styles from './../../styles/components/article/Preview.css'
import { Link, Paragraph } from './../common'
import { PreviewPicture } from './'

const Preview = ({
  api,
  url,
  thumbnailPath,
  title,
  datePublished,
  text,
  truncate
}) => {
  const thumbnail = thumbnailPath
    ? require('./../../assets/images' + thumbnailPath)
    : undefined

  return (
    <div className={styles['article-entity']}>
      <div className={styles['columns']}>
        <div className={styles['side']}>
          <Link href={`/${api}/${url}`}>
            <PreviewPicture url={thumbnail} />
          </Link>
        </div>
        <div className={styles['content']}>
          <div className={styles['caption']}>
            <div className={styles['headline-link']}>
              <Link href={`/${api}/${url}`}>
                {title}
              </Link>
            </div>
            <div className={styles['date']}>
              {utils.formatDate(datePublished)}
            </div>
          </div>
          <Paragraph>
            {_.truncate(text, {
              length: truncate,
              separator: /,? +/
            })}
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

Preview.defaultProps = {
  truncate: 250
}

export default Preview
