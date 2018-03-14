import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import effectsStyles from './../styles/libs/effects.css'
import PropTypes from 'prop-types'

import styles from './../styles/components/Popup.css'
import LoadingAnimation from './LoadingAnimation'
import ClosesOnExternalClick from './ClosesOnExternalClick'
import Button from './common/Button'
import Paragraph from './common/Paragraph'

class Popup extends Component {
  static PropTypes = {
    onClose: PropTypes.func,
    hint: PropTypes.string
  }

  renderLoader() {
    return (
      <div className={styles['loader-wrapper']}>
        <LoadingAnimation />
      </div>
    )
  }

  render() {
    const { onClose } = this.props

    return (
      <ClosesOnExternalClick onClose={onClose}>
        <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionName={{
            appear: effectsStyles['appear'],
            appearActive: effectsStyles['appear-active']
          }}
        >
          <div
            className={styles['popup']}
            ref={node => this.node = node}
          >
            <div className={styles['inner']}>
              {this.props.children}
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </ClosesOnExternalClick>
    )
  }
}

export default Popup
