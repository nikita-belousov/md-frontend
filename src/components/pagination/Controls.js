import React, { Component } from 'react'
import styles from './../../styles/components/pagination/Controls.css'
import { NavLink } from './../common'

const Controls = ({ path, totalPages, pageToShow }) => (
  <div className={styles['nav']}>
    <div className={styles['links-inner']}>
      {(pageToShow > 0) &&
        <div className={styles['prev']}>
          <NavLink to={`/${path}/pages/${pageToShow - 1}`}>
            ←
          </NavLink>
        </div>}
      {_.times(totalPages).map(num =>
        <div key={num}>
          <div className={styles['nav-link']}>
            <NavLink to={`/${path}/pages/${num}`}>
              {num}
            </NavLink>
          </div>
        </div>)}
      {(pageToShow < totalPages - 1) &&
        <div className={styles['next']}>
          <NavLink to={`/${path}/pages/${pageToShow + 1}`}>
            →
          </NavLink>
        </div>}
    </div>
  </div>
)

export default Controls
