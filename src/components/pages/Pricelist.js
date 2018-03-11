import React, { Component } from 'react'
import _ from 'lodash'
import scrollToWithAnimation from 'scrollto-with-animation'
import styles from '../../styles/components/pages/Pricelist.css'

import withFetch from '../HOCs/withFetch'
import NarrowPage from './NarrowPage'
import TextInput from '../common/TextInput'
import Paragraph from '../common/Paragraph'
import Checkbox from '../common/Checkbox'

const getAbsoluteCoords = (elem) => {
  const box = elem.getBoundingClientRect()

  return {
    top: Math.round(box.top + window.pageYOffset),
    left: Math.round(box.left + window.pageXOffset)
  }
}

class Pricelist extends Component {
  constructor(props) {
    super(props)

    this.pricelistData = this.processFetched()

    this.state = {
      navbarActive: this.pricelistData[0].title,
      filter: {
        'title': '',
        'isSocial': false
      }
    }

    this.isInitialRender = true
    this.categories = {}
    this.scrollAnimationTime = 800
    this.isAutoScrolling = false
    this.scrollAnimationQueue = []
  }

  componentDidMount() {
    this.isInitialRender = false
    this.pricesTop = getAbsoluteCoords(this.scrollableNode).top
    this.pricesCenter = Math.round(this.scrollableNode.offsetHeight / 2)
    this.setCategoriesTops()

    this.onPriceScroll = this.scrollableNode.addEventListener('scroll', e => {
      if (this.isAutoScrolling)
        return

      const current = this.categories[this.state.navbarActive]
      const currentTop = getAbsoluteCoords(current.node).top
        - this.pricesTop
      const currentBottom = getAbsoluteCoords(current.node).top
        + current.node.offsetHeight
        - this.pricesTop

      let newTitle
      if (currentTop > this.pricesCenter) {
        newTitle = this.getNearbyCategoryTitle(current.title, 'prev')
      } else if (currentBottom < this.pricesCenter) {
        newTitle = this.getNearbyCategoryTitle(current.title, 'next')
      }

      if (newTitle) this.setNavbarActive(newTitle)
    })
  }

  componentWillUnmount() {
    this.scrollableNode.removeEventListener(this.onPriceScroll)
  }

  processFetched() {
    return this.props.fetchedData.reduce((res, serv) => {
      const category = serv.category.title
      const exists = res.find(e => e.title === category)

      if (exists) {
        exists.services.push(serv)
      } else {
        res.push({
          title: category,
          services: [serv]
        })
      }

      return res
    }, [])
  }

  getNearbyCategoryTitle(currentTitle, which='next') {
    const currentIndex = this.pricelistData
      .reduce((res, category, i) => {
        if (category.title === currentTitle)
          res = i
        return res
      }, 0)

    return (which === 'prev')
      ? this.pricelistData[currentIndex - 1].title
      : this.pricelistData[currentIndex + 1].title
  }

  setCategoriesTops() {
    Object.keys(this.categories).forEach((title, i) => {
      const category = this.categories[title]

      let top
      if (i === 0) {
        top = 0
      } else {
        top = getAbsoluteCoords(category.node).top
          + this.scrollableNode.scrollTop
          - this.pricesTop
      }
      category.top = top
    })
  }

  scrollTo(categoryTitle) {
    const dest = this.categories[categoryTitle].top

    this.isAutoScrolling = true
    this.scrollAnimationQueue.push(true)
    scrollToWithAnimation(
      this.scrollableNode,
      'scrollTop',
      dest,
      this.scrollAnimationTime,
      'easeInOutExpo',
      () => {
        this.scrollAnimationQueue.pop()
        if (this.scrollAnimationQueue.length === 0)
          this.isAutoScrolling = false
      }
    )
  }

  setNavbarActive = (categoryTitle) => {
    this.setState(prev => ({
      ...prev,
      navbarActive: categoryTitle
    }))
  }

  handleNavbarLinkClick = (e, categoryTitle) => {
    e.preventDefault()

    this.setCategoriesTops()
    this.setNavbarActive(categoryTitle)
    this.scrollTo(categoryTitle)
  }

  handleFilterChange = (e) => {
    let { name, value } = e.target
    if (e.target.type === 'checkbox') {
      value = e.target.checked
    }

    this.setState(prev => ({
      ...prev,
      filter: {
        ...prev.filter,
        [name]: value
      }
    }))
  }

  applyFilters(data) {
    const { filter } = this.state

    return data.reduce((result, category) => {
      let filteredCategory = {}
      filteredCategory.title = category.title

      filteredCategory.services = category.services.filter(service =>
        _.lowerCase(service.title).includes(_.lowerCase(filter.title).trim())
          && (service.isSocial === filter.isSocial)
      )

      result.push(filteredCategory)
      return result
    }, [])
  }

  initCategory = (title, node) => {
    if (this.isInitialRender)
      this.categories[title] = { title, node }
  }

  renderNavbar() {
    const categoryservices = this.pricelistData.reduce((res, val) => {
      res.push(val.title)
      return res
    }, [])

    return (
      <div className={styles['nav-bar']}>
        <ul>
          {categoryservices.map(title => {
            const isActive = this.state.navbarActive === title
            const className = isActive
              ? styles['nav-bar-link--active']
              : styles['nav-bar-link']

            return (
              <li href="#" className={className}>
                <a href="#" onClick={e => this.handleNavbarLinkClick(e, title)}>
                  {_.capitalize(title)}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderPrices() {
    const renderCategory = (category) => {
      const isEmpty = category.services.length === 0

      return (
        <div
          className={styles['category']}
          ref={node => this.initCategory(category.title, node)}
        >
          <div className={styles['category-title']}>
            {_.capitalize(category.title)}
          </div>
          <div className={styles['services']}>
            {!isEmpty ?
              category.services.map(service =>
                renderService(service)
              ) :
              <div className={styles['no-results']}>
                <Paragraph>
                  Нет результатов...
                </Paragraph>
              </div>}
          </div>
        </div>
      )
    }

    const renderService = (service) => (
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

    const filteredData = this.applyFilters(this.pricelistData)
    const { filter } = this.state

    return (
      <div className={styles['prices']}>
        <div className={styles['top-bar']}>
          <div className={styles['filter']}>
            <div className={styles['by-title']}>
              <TextInput
                alt
                appearance='round-transparent'
                name='title'
                value={filter.title}
                onChange={this.handleFilterChange}
                placeholder='Что ищете?'
              />
              {/* <div className={styles['placeholder']}>
                Что ищете?
              </div> */}
            </div>
            <div className={styles['by-social']}>
              <Checkbox
                name='isSocial'
                label='только с социальной скидкой'
                checked={filter.isSocial}
                onChange={this.handleFilterChange}
              />
            </div>
          </div>
        </div>
        <div
          className={styles['scrollable']}
          ref={node => this.scrollableNode = node}
        >
          {filteredData.map(category =>
            renderCategory(category)
          )}
        </div>
      </div>
    )
  }

  render () {
    return (
      <NarrowPage heading='прайслист'>
        <div className={styles['columns']}>
          <div className={styles['side']}>
            {this.renderNavbar()}
          </div>
          <div className={styles['main']}>
            {this.renderPrices()}
          </div>
        </div>
      </NarrowPage>
    )
  }
}

export default withFetch(Pricelist)
