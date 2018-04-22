import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './../../styles/components/common/Pagination.css'
import withFetch from './../HOCs/withFetch'
import { Controls, Items } from './'

const Page = ({
  pager,
  totalPages,
  pageToShow,
  itemComponent,
  path,
  docs
}, {
  onPageNotFound
}) => {
  return (
    <div className={styles['page']}>
      <div className={styles['items-wrapper']}>
        <Items
          docs={docs}
          itemComponent={itemComponent}
        />
      </div>
      {(totalPages > 1) &&
        <div className={styles['controls-wrapper']}>
          <Controls
            path={path}
            pager={pager}
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

export default Page
