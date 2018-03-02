import React from 'react'
import styles from '../../styles/components/common/PositionLabel.css'

const PositionLabel = props => (
  <div className={styles['position-label']}>
    {props.children}
  </div>
)

export default PositionLabel
