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
              && this.renderSlider(fetchedData)}
          </div>
          <div className={styles["more-about"]}>
            <Link href="/special">
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

export default withFetch(Specials)
