import React, { Component } from 'react'
import scrollToWithAnimation from 'scrollto-with-animation'
import styles from './../../styles/components/pages/Pricelist.css'

import withFetch from './../HOCs/withFetch'
import PricelistSidebar from './../PricelistSidebar'
import PricelistTable from './../PricelistTable'

class PricelistContainer extends Component {
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
    this.pricesTop = utils.getAbsoluteCoords(this.scrollableNode).top
    this.pricesCenter = Math.round(this.scrollableNode.offsetHeight / 2)
    this.setCategoriesTops()

    this.onPriceScroll = this.scrollableNode.addEventListener('scroll', e => {
      if (this.isAutoScrolling)
        return

      const current = this.categories[this.state.navbarActive]
      const currentTop = utils.getAbsoluteCoords(current.node).top
        - this.pricesTop
      const currentBottom = utils.getAbsoluteCoords(current.node).top
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
        top = utils.getAbsoluteCoords(category.node).top
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

    this.setState(prev => _.merge(prev, {
      filter: { [name]: value }
    }), console.log(JSON.stringify(this.state, null, 2)))
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

  initScrollable = (node) => {
    this.scrollableNode = node
  }

  render() {
    const { navbarActive, filter } = this.state

    const siderbarLinks = this.pricelistData
      .reduce((res, serv) => [...res, serv.title], [])

    return (
      <div>
        <div className={styles['columns']}>
          <div className={styles['side']}>
            <PricelistSidebar
              links={siderbarLinks}
              active={navbarActive}
              onLinkClick={this.handleNavbarLinkClick}
            />
          </div>
          <div className={styles['main']}>
            <PricelistTable
              data={this.applyFilters(this.pricelistData)}
              onScrollableRef={this.initScrollable}
              onCategoryRef={this.initCategory}
              onFilterChange={this.handleFilterChange}
              filterData={filter}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withFetch(PricelistContainer)
