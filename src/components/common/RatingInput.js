import React from 'react'
import styles from '../../styles/components/common/RaitingInput.css'
import StarRating from './../StarRating'

const RatingInput = props => {
  return (
    <div>
      <div className={styles['label']}>
        {props.label}
      </div>
      <StarRating {...props} />
    </div>
  )
}

export default RatingInput
