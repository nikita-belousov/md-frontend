import React, { Component } from 'react'
import styles from './../styles/components/Popup.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import effectsStyles from './../styles/libs/effects.css'
import LoadingAnimation from './LoadingAnimation'
import ClosesOnExternalClick from './ClosesOnExternalClick'
import Button from './common/Button'

class Popup extends Component {
  renderLoader() {
    return (
      <div className={styles['loader-wrapper']}>
        <LoadingAnimation />
      </div>
    )
  }

  render() {
    return (
      <ClosesOnExternalClick onClose={this.props.onClose}>
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
            {this.props.renderButton()}
          </div>
        </ReactCSSTransitionGroup>
      </ClosesOnExternalClick>
    )
  }
}

export default Popup
