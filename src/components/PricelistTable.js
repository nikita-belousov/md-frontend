import React, { Component } from 'react'
import styles from './../styles/components/pages/Pricelist.css'

import Paragraph from './common/Paragraph'
import TextInput from './common/TextInput'
import Checkbox from './common/Checkbox'

class PricelistTable extends Component {
  renderCategory = (category) => {
    const isEmpty = category.services.length === 0

    return (
      <div
        className={styles['category']}
        ref={node => this.props.onCategoryRef(category.title, node)}
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
      <div className={styles['service']}>
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

  render() {
    const {
      data,
      filterData,
      onFilterChange,
      onScrollableRef
    } = this.props

    return (
      <div className={styles['prices']}>
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
        <div
          className={styles['scrollable']}
          ref={onScrollableRef}
        >
          {data.map(this.renderCategory)}
        </div>
      </div>
    )
  }
}

export default PricelistTable
