import React, { Component } from 'react'
import styles from './../../styles/components/pagination/Items.css'
import { withFetch } from './../HOCs'

const Items = ({ fetchedData, itemComponent, path }) => (
  <div>
    {fetchedData.map(item =>
      <div
        key={item.id}
        className={styles['pagination-item']}
      >
        {React.createElement(itemComponent, { ...item, path })}
      </div>
    )}
  </div>
)

export default withFetch(Items)
