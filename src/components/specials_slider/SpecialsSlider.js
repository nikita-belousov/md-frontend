import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'small-uuid'
import Slider from 'react-slick'

import styles from './../../styles/components/sections/SpecialsSlider.css'
import { withFetch } from './../HOCs'
import Section from './../Section'
import Container from './../Container'
import { SpecialCard } from './index'
import { NavArrow, Link } from './../common'

class SpecialsSlider extends Component {
  settings = {
    slidesToShow: 4,
    infinite: true,
    speed: 500,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <NavArrow wrapperClass={styles['prev-arrow-wrapper']} type="prev" />,
    nextArrow: <NavArrow wrapperClass={styles['next-arrow-wrapper']} type="next" />
  }

  renderSlider(data) {
    return (
      <Slider {...this.settings}>
        {data.map(special => (
          <div key={special._id}>
            <SpecialCard {...special} />
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
          <div className={styles['slider-wrapper']}>
            {(fetchedData && fetchedData.length > 0)
              && this.renderSlider(fetchedData.filter(e => e.card))}
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

export default withFetch(SpecialsSlider, {
  api: 'special',
  query: '?_sort=datePublished'
})
