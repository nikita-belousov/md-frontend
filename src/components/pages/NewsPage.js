import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/components/pages/NewsPage.css'

import NarrowPage from './NarrowPage'
import Pagination from './../common/Pagination'
import ArticleList from './../ArticlesList'

const NewsPage = () => (
  <NarrowPage heading='новости'>
    <div className={styles['news']}>
      <Pagination
        itemsComponent={ArticlesList}
        itemsOnPage={7}
        api={'news'}
      />
    </div>
  </NarrowPage>
)

export default NewsPage
