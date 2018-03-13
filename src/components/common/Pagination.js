import _ from 'lodash'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './../../styles/components/common/Pagination.css'

import Link from './Link'
import NavLink from './NavLink'

class Pagination extends Component {
  static contextTypes = {
    onPageNotFound: PropTypes.func
  }

  static propTypes = {
    itemsComponent: PropTypes.func,
    itemsOnPage: PropTypes.number,
    api: PropTypes.string
  }

  static defaultTypes = {
    itemsOnPage: 7
  }

  constructor(props) {
    super(props)
    this.state = { totalItems: null }
    this.firstVisibleNum = 0
  }

  componentDidMount() {
    this.loadTotalItems()
  }

  loadTotalItems() {
    fetch(`${process.env.REACT_APP_API_ROOT}/${this.props.api}-quantity`)
      .then(data => data.json())
      .then(json => this.setState({ totalItems: json.quantity }))
  }

  renderPage(num) {
    if (!_.times(this.totalPages).includes(num)) {
      this.context.onPageNotFound()
    }

    return (
      <div className={styles['page']}>
        <div className={styles['items']}>
          {this.renderItems(num)}
        </div>
        <div className={styles['pagination']}>
          {this.renderPagination(num)}
        </div>
      </div>
    )
  }

  renderItems(pageNum) {
    const { itemsComponent, api, itemsOnPage, query } = this.props
    return React.createElement(itemsComponent, {
      api: `${api}?_sort=published:desc&_start=${itemsOnPage * pageNum}&_limit=${itemsOnPage}&${query}`
    })
  }

  renderPagination(pageNum) {
    const { match, api, itemsOnPage } = this.props

    // const median = this.firstVisibleNum + 2
    //
    // if (pageNum === nums[0]) {
    //   this.firstVisibleNum = nums[0]
    // } else if (pageNum === nums.slice(-1)[0]) {
    //   this.firstVisibleNum = nums.slice(-1)[0] - 5
    // } else if (pageNum > median && (this.firstVisibleNum + 5) < totalPages) {
    //   this.firstVisibleNum += 1
    // } else if (pageNum < median && this.firstVisibleNum > 0) {
    //   this.firstVisibleNum -= 1
    // }

    // let pageLinks
    // if (totalPages > 6) {
    //   pages = (
    //     <ul>
    //       {(this.firstVisibleNum !== 0) &&
    //         <li>
    //           <NavLink to={`${match.url}/pages/${nums[0]}`}>
    //             {nums[0]}
    //           </NavLink>
    //         </li>}
    //       {(this.firstVisibleNum !== 0) &&
    //         <li> ... </li>}
    //       {nums.slice(this.firstVisibleNum, this.firstVisibleNum + 5).map(num =>
    //         <li>
    //           <NavLink to={`${match.url}/pages/${num}`}>
    //             {num}
    //           </NavLink>
    //         </li>)}
    //       {(this.firstVisibleNum < (nums.slice(-1)[0] - 5)) &&
    //         <li> ... </li>}
    //       {(this.firstVisibleNum < (nums.slice(-1)[0] - 5)) &&
    //         <li>
    //           <NavLink to={`${match.url}/pages/${nums.slice(-1)[0]}`}>
    //             {nums.slice(-1)[0]}
    //           </NavLink>
    //         </li>}
    //     </ul>
    //   )
    // } else {
    //   pageLinks = (
    //     <ul>
    //       {nums.map(num =>
    //         <li>
    //           <NavLink to={`${match.url}/pages/${num}`}>
    //             {num}
    //           </NavLink>
    //         </li>
    //       )}
    //     </ul>
    //   )
    // }

    return (
      <div className={styles['nav']}>
        <div className={styles['links-inner']}>
          {(pageNum > 0) &&
            <div className={styles['prev']}>
              <NavLink to={`${match.url}/pages/${pageNum - 1}`}>
                ←
              </NavLink>
            </div>}
          {_.times(this.totalPages).map(num =>
            <div>
              <div className={styles['nav-link']}>
                <NavLink to={`${match.url}/pages/${num}`}>
                  {num}
                </NavLink>
              </div>
            </div>)}
          {(pageNum < this.totalPages - 1) &&
            <div className={styles['next']}>
              <NavLink to={`${match.url}/pages/${pageNum + 1}`}>
                →
              </NavLink>
            </div>}
        </div>
      </div>
    )
  }

  render() {
    if (!this.state.totalItems) return null

    this.totalPages = Math.ceil(this.state.totalItems / this.props.itemsOnPage)
    const { match } = this.props

    return (
      <Router>
        <div>
          <Route
            exact
            path={`${match.path}/pages/:pageNum`}
            render={({ match }) => this.renderPage(parseInt(match.params.pageNum))}
          />
        </div>
      </Router>
    )
  }
}

export default withRouter(Pagination)
