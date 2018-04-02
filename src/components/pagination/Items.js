import React, { Component } from 'react'
import styles from './../../styles/components/pagination/Items.css'
import { withFetch } from './../HOCs'

const Items = ({ fetchedData, itemComponent, api }) => (
  <div>
    {fetchedData.map(item =>
      <div
        key={item.id}
        className={styles['pagination-item']}
      >
        {React.createElement(itemComponent, { ...item, api })}
      </div>
    )}
  </div>
)

export default withFetch(Items)
