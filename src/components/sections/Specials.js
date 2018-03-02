import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'small-uuid'
import styles from './../../styles/components/sections/Specials.css'

import Slider from 'react-slick'
import withFetch from './../HOCs/withFetch'
import Section from './../Section'
import Container from './../Container'
import SpecialCard from './../SpecialCard'
import NavArrow from './../common/NavArrow'
import Link from './../common/Link'

class Specials extends Component {
  settings = {
    slidesToShow: 4,
    infinite: true,
    speed: 500,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <div><NavArrow className={styles["arrow-next"]} type="next" /></div>,
    prevArrow: <div><NavArrow className={styles["arrow-prev"]} type="prev" /></div>
  }

  renderSlider(data) {
    return (
      <Slider {...this.settings}>
        {data.map(specialData => (
          <div key={specialData._id}>
            <SpecialCard {...specialData} />
          </div>
        ))}
      </Slider>
    )
  }

  render() {
    const { fetchedData } = this.props

    return (
      <div className={styles['wrapper']}>
        <Container>
          <h2 className={styles['caption']}>
            Специальные предложения
          </h2>
          <div className={styles['slier-wrapper']}>
            {(fetchedData && fetchedData.length > 0)
              && this.renderSlider(fetchedData)}
          </div>
          <div className={styles["more-about"]}>
            <Link href="/specials">
              Подробнее об акциях
            </Link>
          </div>
        </Container>
      </div>
    )
  }
}

Specials.contextTypes = {
  apiURL: PropTypes.string
}

export default withFetch(Specials, 'special')
