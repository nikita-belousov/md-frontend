import _ from 'lodash'
import React from 'react'
import Container from './../Container'
import styles from '../../styles/components/NarrowPage.css'

const NarrowPage = props => (
  <Container>
    <div className={styles['wrapper']}>
      <div className={styles['heading']}>
        {_.capitalize(props.heading)}
      </div>
      <div className={styles['content']}>
        {props.children}
      </div>
    </div>
  </Container>
)

export default NarrowPage
