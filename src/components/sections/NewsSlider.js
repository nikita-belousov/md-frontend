import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './../../styles/components/sections/NewsSlider.css'
import uuid from 'small-uuid'
import { formatDate } from './../../utils'

import withFetch from './../HOCs/withFetch'
import FontAwesome from 'react-fontawesome'
import Container from './../Container'
import Slider from 'react-slick'
import NavArrow from './../common/NavArrow'
import Paragraph from './../common/Paragraph'
import Link from './../common/Link'

class NewsSlider extends Component {
  settings = {
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <div><NavArrow className={styles["arrow-next"]} type="next" /></div>,
    prevArrow: <div><NavArrow className={styles["arrow-prev"]} type="prev" /></div>
  }

  renderSlider(data) {
    return (
      <Slider {...this.settings}>
        {data.map(obj => (
          <div key={uuid.create()}>
            <div className={styles['news-obj']}>
              <Link href={`/news/${obj.id}`}>
                {obj.heading}
              </Link>
              <div className={styles['bottom-line']}>
                <div className={styles['data']}>
                  {formatDate(obj.published)}
                </div>
                <div className={styles['views']}>
                  <span>
                    <FontAwesome name='eye' />
                  </span>
                  {obj.views}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    )
  }

  render() {
    const { fetchedData } = this.props

    return (
      <div className={styles['section-wrapper']}>
        <Container>
          <h3>Новости</h3>
          {(fetchedData && fetchedData.length > 0)
            && this.renderSlider(fetchedData)}
        </Container>
      </div>
    )
  }
}

export default withFetch(NewsSlider)
