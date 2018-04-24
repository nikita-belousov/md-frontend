import React, { Component } from 'react'
import styles from './../../styles/components/pages/Pricelist.css'
import { Paragraph, TextInput, Checkbox } from './../common'

class PricelistTable extends Component {
  renderCategory = ({ id, title, services }) => {
    const { interactive, onCategoryRef } = this.props
    const isEmpty = services.length === 0

    return (
      <div
        key={title}
        className={styles['category']}
        ref={interactive &&
          (node => onCategoryRef(id, node))}
      >
        <div className={styles['category-title']}>
          {_.capitalize(title)}
        </div>
        <div className={styles['services']}>
          {!isEmpty
            ? services.map(service => this.renderService(service))
            : <div className={styles['no-results']}>
                <Paragraph>
                  Нет результатов...
                </Paragraph>
              </div>}
        </div>
      </div>
    )
  }

  renderService = (service) => {
    return (
      <div
        key={service.order}
        className={styles['service']}
      >
        <div className={styles['title']}>
          {service.title}
        </div>
        <div className={styles['line']} />
        <div className={styles['price']}>
          {service.price + '₽'}
        </div>
      </div>
    )
  }

  renderTopBar() {
    const { filterData, onFilterChange } = this.props

    return (
      <div className={styles['top-bar']}>
        <div className={styles['filter']}>
          <div className={styles['by-title']}>
            <TextInput
              alt
              appearance='round-transparent'
              name='title'
              value={filterData.title}
              onChange={onFilterChange}
              placeholder='Что ищете?'
            />
          </div>
          <div className={styles['by-social']}>
            <Checkbox
              name='social'
              label='только с социальной скидкой'
              checked={filterData.social}
              onChange={onFilterChange}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {
      data,
      onScrollableRef,
      interactive
    } = this.props

    return (
      <div className={interactive ? styles['prices--interactive'] : styles['prices']}>
        {interactive && this.renderTopBar()}
        <div
          className={styles['inner']}
          ref={interactive && onScrollableRef}
        >
          {data.map(this.renderCategory)}
        </div>
      </div>
    )
  }
}

export default PricelistTable
