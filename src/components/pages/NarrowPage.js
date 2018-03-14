import _ from 'lodash'
import React from 'react'
import Container from './../Container'
import styles from './../../styles/components/pages/NarrowPage.css'

const NarrowPage = ({ heading, children, textOnly }) => (
  <Container>
    <div className={textOnly
      ? styles['wrapper--text-only']
      : styles['wrapper']
    }>
      <div className={styles['heading']}>
        {heading}
      </div>
      <div className={styles['content']}>
        {children}
      </div>
    </div>
  </Container>
)

export default NarrowPage
