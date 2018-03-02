import React, { Component } from 'react'
import styles from '../../styles/components/common/Button.css'
import LoadingAnimation from './../LoadingAnimation'

class Button extends Component {
  constructor(props) {
    super(props)

    this.base = 'button--' + (props.type || 'regular')
    this.classes = {
      normal: this.base,
      loading: this.base + '--loading',
      finished: this.base + '--finished',
      disabled: this.base + '--disabled'
    }
  }

  renderLoader() {
    return (
      <div className={styles['loader-wrapper']}>
        <LoadingAnimation />
      </div>
    )
  }

  render() {
    const {
      loadingTime,
      successText,
      children,
      type,
      width,
      btnState,
      ...restProps
    } = this.props

    return (
      <button
        className={styles[this.classes[btnState]]}
        style={{ width }}
        {...restProps}
      >
        {btnState === 'loading' ? this.renderLoader()
          : btnState === 'finished' ? successText : children}
      </button>
    )
  }
}

Button.defaultProps = {
  btnState: 'normal'
}

export default Button
