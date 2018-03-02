import React, { Component } from 'react'
import Link from './common/Link'
import Paragraph from './common/Paragraph'
import styles from './../styles/components/SpecialCard.css'

class SpecialCard extends Component {
  state = {
    isHovered: false
  }

  render() {
    const { id, title, description, url, image, color } = this.props

    const imageUrl = require(`./../assets/images/specials/${image}`)
    const bgStyle = {
      backgroundImage: `linear-gradient(to bottom, transparent 0%, ${color} 40%, ${color} 100%),
                   url(${imageUrl})`
    }

    return (
      <div className={styles['wrapper']}>
        <div
          className={styles['card']}
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
            <div className={styles['more']} href="#">
              <Link type='alt' href={`/special/${id}`}>
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SpecialCard
