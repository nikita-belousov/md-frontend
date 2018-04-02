import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './../../styles/components/common/Pagination.css'
import withFetch from './../HOCs/withFetch'
import { Controls, Items } from './'

const Page = ({
  api,
  sort,
  itemsOnPage,
  totalPages,
  pageToShow,
  itemComponent
}, {
  onPageNotFound
}) => {
  if (!_.times(totalPages).includes(pageToShow)) {
    onPageNotFound()
    return null
  }

  return (
    <div className={styles['page']}>
      <div className={styles['items-wrapper']}>
        <Items
          itemComponent={itemComponent}
          api={api}
          query={`_start=${itemsOnPage * pageToShow}
                 &_limit=${itemsOnPage}`
            + (sort ? `&_sort=${sort}` : '')}
        />
      </div>
      {(totalPages > 1) &&
        <div className={styles['controls-wrapper']}>
          <Controls
            api={api}
            totalPages={totalPages}
            pageToShow={pageToShow}
          />
        </div>}
    </div>
  )
}

Page.contextTypes = {
  onPageNotFound: PropTypes.func
}

export default withFetch(Page)
