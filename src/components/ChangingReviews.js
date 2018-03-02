import React, { Component } from 'react'
import styles from './../styles/components/ChangingReviews.css'
import withFetch from './HOCs/withFetch'
import Paragraph from './common/Paragraph'
import Link from './common/Link'
import StaticRating from './StaticRating'

import _ from 'lodash'

class ChangingReviews extends Component {
  state = { current: 0 }
  quantity = 10

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prev => (
        { current: prev.current < this.quantity - 1 ? prev.current + 1 : 0 }
      ))
    }, this.props.interval)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  renderContent(review) {
    const { maxLength } = this.props
    const words = _.words(review.review)

    if (words.length > maxLength) {
      return (
        <div>
          <Paragraph>
            {words.slice(0, maxLength).join(' ') + '...'}
          </Paragraph>
          <div className={styles['more-link']}>
            <Link type='alt' href={review.url}>
              Читать полностью
            </Link>
          </div>
        </div>
      )
    } else return words.join(' ')
  }

  renderReview(num) {
    const { fetchedData } = this.props

    return (
      <div>
        <div>
          <div className={styles['review-bg']}>
            {this.renderContent(fetchedData[num])}
          </div>
          <div className={styles['author']}>
            <div className={styles['name']}>
              {fetchedData[num].name}
            </div>
            <div className={styles['rating']}>
              <StaticRating value={fetchedData[num].rating} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { fetchedData } = this.props

    return (fetchedData && fetchedData.length > 0)
      && this.renderReview(this.state.current)
  }
}

export default withFetch(ChangingReviews, 'reviews?_sort=published:desc')
