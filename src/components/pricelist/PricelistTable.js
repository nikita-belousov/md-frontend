import React, { Component } from 'react'
import styles from './../../styles/components/pages/Pricelist.css'
import { Paragraph, TextInput, Checkbox } from './../common'

class PricelistTable extends Component {
  renderCategory = (category) => {
    const { interactive, onCategoryRef } = this.props
    const isEmpty = category.services.length === 0

    return (
      <div
        key={category.title}
        className={styles['category']}
        ref={interactive && (node => this.props.onCategoryRef(category.title, node))}
      >
        <div className={styles['category-title']}>
          {_.capitalize(category.title)}
        </div>
        <div className={styles['services']}>
          {!isEmpty
            ? category.services.map(service => this.renderService(service))
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
        key={service.id}
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
              name='isSocial'
              label='только с социальной скидкой'
              checked={filterData.isSocial}
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
