import React, { Component } from 'react'
import styles from '../styles/components/Review.css'

import Paragraph from './common/Paragraph'
import Link from './common/Link'
import StaticRating from './StaticRating'

const PREVIEW_LENGTH = 40 // words

class Review extends Component {
  constructor(props) {
    super(props)
    this.initText(props.review)
    this.state = { fullMode: this.tooBig ? false : true }
  }

  initText(text) {
    const words = text.split(' ')
    if (words.length > PREVIEW_LENGTH) {
      this.tooBig = true
      this.previewText = words
        .slice(0, PREVIEW_LENGTH)
        .join(' ')
        + '...'
    }
    this.fullText = words.join(' ')
  }

  setFullMode(to='false') {
    this.setState(prev => ({
      ...prev,
      fullMode: to
    }))
  }

  handleFurtherLinkClick = (e) => {
    e.preventDefault()
    this.setFullMode(true)
  }

  renderResponse(response) {
    return (
      <div className={styles['response']}>
        <Paragraph type='small'>
          {response}
        </Paragraph>
      </div>
    )
  }

  renderFull() {
    return (
      <Paragraph>
        {this.fullText}
      </Paragraph>
    )
  }

  renderPreview() {
    return (
      <div>
        <Paragraph>
          {this.previewText}
        </Paragraph>
        <div className={styles['read-further']}>
          <Link
            href="#"
            onClick={this.handleFurtherLinkClick}
          >
            Читать далее
          </Link>
        </div>
      </div>
    )
  }

  render() {
    let {
      name,
      published,
      rating,
      review,
      response
    } = this.props

    const { fullMode } = this.state
    const date = new Date(published)

    return (
      <div className={styles['wrapper']}>
        <div className={styles['review']}>
          <div className={styles['top-row']}>
            <div className={styles['author']}>
              {name}
            </div>
            <div className={styles['date']}>
              {date.toLocaleDateString(
                'ru-RU',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </div>
          </div>
          <div className={styles['rating']}>
            <StaticRating value={rating} />
          </div>
          <div className={styles['text']}>
            {fullMode
              ? this.renderFull()
              : this.renderPreview()}
          </div>
        </div>
        {response && this.renderResponse(response)}
      </div>
    )
  }
}

export default Review
