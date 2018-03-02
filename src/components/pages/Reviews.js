import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/components/pages/Reviews.css'

import withFetch from './../HOCs/withFetch'
import Link from './../common/Link'
import NarrowPage from './NarrowPage'
import Review from './../Review'
import LeaveFeedbackPopup from './../LeaveFeedbackPopup'

class Reviews extends Component {
  state = { leaveFeedbackPopup: false }

  handleLeaveFeedbackClick = (e) => {
    e.preventDefault()

    this.setState(prev => ({
      ...prev,
      leaveFeedbackPopup: true
    }))
  }

  onPopupClose = () => {
    this.setState(prev => ({
      ...prev,
      leaveFeedbackPopup: false
    }))
  }

  renderPopup() {
    return (
      <div className={styles['feedback-popup']}>
        <LeaveFeedbackPopup
          onClose={this.onPopupClose}
        />
      </div>
    )
  }

  render() {
    const { leaveFeedbackPopup } = this.state
    const { fetchedData } = this.props

    return (
      <NarrowPage heading='отзывы'>
        <div className={styles['give-feedback']}>
          <div className={styles['feedback-link-wrapper']}>
            <Link
              type='dashed'
              onClick={this.handleLeaveFeedbackClick}
              isActive={leaveFeedbackPopup}
            >
              Оставить отзыв
            </Link>
          </div>
          {leaveFeedbackPopup && this.renderPopup()}
        </div>
        {(fetchedData && fetchedData.length > 0)
          && fetchedData.map(review =>
            <Review {...review} />
        )}
      </NarrowPage>
    )
  }
}

export default withFetch(Reviews)
