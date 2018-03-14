import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/components/pages/NewsPage.css'

import withFetch from './../HOCs/withFetch'
import Link from './../common/Link'
import NarrowPage from './NarrowPage'
import News from './../News'
import Pagination from './../common/Pagination'

class ReviewsPage extends Component {
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
    return (
      <NarrowPage heading='новости'>
        <div className={styles['news']}>
          <Pagination
            itemsComponent={News}
            itemsOnPage={7}
            api={'news'}
          />
        </div>
      </NarrowPage>
    )
  }
}

export default ReviewsPage
