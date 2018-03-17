import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import uuid from 'small-uuid'
import styles from './../styles/components/MainMenu.css'

import withFetch from './HOCs/withFetch'
import Container from './Container'
import Popup from './Popup'
import Button from './common/Button'
import Link from './common/Link'

class MainMenu extends Component {
  state = {
    activeItem: null
  }

  handleItemClick(e, i, item) {
    if (!item.subcategories.length) return

    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    this.setState(prevState => ({ activeItem: i }))
  }

  resetActiveItem = () => {
    this.setState({
      activeItem: null
    })
  }

  renderPopupButton = (text) => {
    return (
      <Button type='popup'>
        {text}
      </Button>
    )
  }

  renderDropdown(item) {
    return (
      <div className={styles['dropdown-wrapper']}>
        <Popup
          renderButton={() => this.renderPopupButton(item['btnTitle'])}
          onClose={this.resetActiveItem}
        >
          <ul className={styles['dropdown']}>
            <li>
              <a
                href={item['mainPath']}
                className={styles['main']}
              >
                {item['mainTitle']}
              </a>
            </li>
            {item.subcategories.map(sub =>
              <li key={uuid.create()}>
                <Link
                  href={sub.url}
                  className={styles['sub-link']}
                >
                  {sub.title}
                </Link>
              </li>)}
          </ul>
        </Popup>
      </div>
    )
  }

  renderItem(item, i) {
    const isActive = this.state.activeItem === i

    return (
      <li key={item.category.url}>
        <NavLink
          to={`/${item.category.url}`}
          activeClassName={styles['category-link--active']}
          className={styles['category-link']}
          onClick={e => this.handleItemClick(e, i, item)}
        >
          {_.capitalize(item.category.title)}
        </NavLink>
        {(this.state.activeItem === i) && this.renderDropdown(item)}
      </li>
    )
  }

  render() {
    const links = this.props.fetchedData.reduce((res, category) =>
      [...res, {
        category: {
          id: category._id,
          title: category.title,
          url: category.page
        },
        subcategories: category.subcategories
      }]
    , [])

    return (
      <div className={styles['wrapper']}>
        <div className={styles['bg']}>
          <Container>
            <ul className={styles['navigation']}>
              {links.map((item, i) =>
                item.category.url && this.renderItem(item, i))}
            </ul>
          </Container>
        </div>
      </div>
    )
  }
}

export default withFetch(MainMenu)
