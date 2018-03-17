import React from 'react'
import styles from './../styles/components/NewsPreviewPicture.css'

const NewsPreviewPicture = ({ url }) => (
  <div
    style={{ backgroundImage: url ? `url(${url})` : null }}
    className={styles['preview-picture']}
  />
)

export default NewsPreviewPicture
