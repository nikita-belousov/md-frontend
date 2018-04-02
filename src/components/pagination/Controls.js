import React, { Component } from 'react'
import { NavLink } from './../common'

const Controls = ({
  api,
  totalPages,
  currentPage
 }) => (
  <div className={styles['nav']}>
    <div className={styles['links-inner']}>
      {(currentPage > 0) &&
        <div className={styles['prev']}>
          <NavLink to={`${api}/pages/${currentPage - 1}`}>
            ←
          </NavLink>
        </div>}
      {_.times(totalPages).map(num =>
        <div key={num}>
          <div className={styles['nav-link']}>
            <NavLink to={`${api}/pages/${currentPage}`}>
              {num}
            </NavLink>
          </div>
        </div>)}
      {(currentPage < totalPages - 1) &&
        <div className={styles['next']}>
          <NavLink to={`${api}/pages/${currentPage + 1}`}>
            →
          </NavLink>
        </div>}
    </div>
  </div>
)

export default Controls
