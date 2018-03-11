import React, { Component } from 'react'
import Link from './common/Link'
import Paragraph from './common/Paragraph'
import styles from './../styles/components/SpecialCard.css'

class SpecialCard extends Component {
  render() {
    const { id, title, description, url, image, color, isBig } = this.props

    const imageUrl = require(`./../assets/images/specials/${image}`)
    const bgStyle = {
      backgroundImage: isBig
        ? `linear-gradient(to left, transparent 0%, ${color} 60%, ${color} 100%), url(${imageUrl})`
        : `linear-gradient(to bottom, transparent 0%, ${color} 60%, ${color} 100%), url(${imageUrl})`
    }

    return (
      <div className={styles['wrapper']}>
        <Link href='#'>
          <div
            className={isBig ? styles['card--big'] : styles['card']}
            style={bgStyle}
          >
            <div className={styles['inner']}>
              <div className={styles['caption']}>
                {title}
              </div>
              <div className={styles['description']}>
                <Paragraph type='small'>
                  {description}
                </Paragraph>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default SpecialCard
