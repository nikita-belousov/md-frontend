import React, { Component } from 'react'
import styles from './../../styles/components/PreviewPicture.css'

const PreviewPicture = ({ url }) => (
  <div
    style={{ backgroundImage: url ? `url(${url})` : null }}
    className={styles['preview-picture']}
  />
)

export default PreviewPicture
