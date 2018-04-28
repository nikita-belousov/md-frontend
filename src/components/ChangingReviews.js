import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import styles from './../styles/components/ChangingReviews.css'

import Paragraph from './common/Paragraph'
import Link from './common/Link'
import StaticRating from './StaticRating'
import ClosesOnExternalClick from './ClosesOnExternalClick'

import { Reviews as api } from './../agent'

import {
  CHANGING_REVIEWS_LOADED,
  CHANGING_REVIEWS_UNLOADED
} from './../constants/actionTypes'

const mapStateToProps = state => ({
  reviews: state.changingReviews.reviews
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: CHANGING_REVIEWS_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: CHANGING_REVIEWS_UNLOADED })
})

class ChangingReviews extends Component {
  state = {
    current: 0,
    fullMode: false
  }

  static defaultProps = {
    quantity: 8
  }

  componentWillMount() {
    const { onLoad, quantity } = this.props
    onLoad(api.page(quantity, 1))
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (!this.state.fullMode) {
        this.setState(prev => (
          { current: prev.current < this.props.quantity - 1
            ? prev.current + 1
            : 0 }
          ))
      }
    }, this.props.interval)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onFullClick = e => {
    e.preventDefault()

    this.setState(prev => ({
      ...prev,
      fullMode: true
    }))
  }

  onFullExit = () => {
    this.setState(prev => ({
      ...prev,
      fullMode: false
    }))
  }

  renderContent(review) {
    const { maxLength } = this.props
    const words = _.words(review.review)

    if (words.length > maxLength && !this.state.fullMode) {
      return (
        <div>
          <Paragraph>
            {words.slice(0, maxLength).join(' ') + '...'}
          </Paragraph>
          <div className={styles['more-link']}>
            <Link
              onClick={this.onFullClick}
              type='alt'
            >
              Читать полностью
            </Link>
          </div>
        </div>
      )
    } else return review.review
  }

  renderReview() {
    const { reviews } = this.props
    const { current } = this.state

    return (
      <div>
        <div className={styles['review-bg']}>
          {this.renderContent(reviews[current])}
        </div>
        <div className={styles['author']}>
          <div className={styles['name']}>
            {reviews[current].author}
          </div>
          <div className={styles['rating']}>
            <StaticRating value={reviews[current].rating} />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { reviews } = this.props
    const { fullMode } = this.state

    if (!reviews || reviews.length === 0) {
      return null
    }

    const wrapperClass = fullMode ? 'wrapper-full': 'wrapper'

    return (
      <div className={styles[wrapperClass]}>
        {fullMode
          ? <ClosesOnExternalClick onClose={this.onFullExit}>
              {this.renderReview()}
            </ClosesOnExternalClick>
          : this.renderReview()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangingReviews)
