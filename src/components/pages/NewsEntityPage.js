import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

import styles from './../../styles/components/pages/NewsEntityPage.css'
import Paragraph from './../common/Paragraph'
import NarrowPage from './NarrowPage'
import withFetch from './../HOCs/withFetch'

const NewsEntityPage = ({ fetchedData }) => {
  const {
    heading,
    text,
    datePublished,
    views
  } = fetchedData

  return (
    <NarrowPage
      squeeze
      heading={heading}
      caption={
        <div className={styles['news-caption']}>
          <div className={styles['caption-date']}>
            {utils.formatDate(datePublished)}
          </div>
          <div className={styles['caption-views']}>
            <span className={styles['views-icon']}>
              <FontAwesome name='eye' />
            </span>
            {views}
          </div>
        </div>
      }
    >
      <Paragraph>
        {text}
      </Paragraph>
    </NarrowPage>
  )
}

export default withFetch(NewsEntityPage)
