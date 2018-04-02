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
import { PreviewPicture } from './../article'

const Dummy = ({ children }) => <div>{children}</div>

class NewsSlider extends Component {
  settings = {
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NavArrow wrapperClass={styles['next-arrow-wrapper']} type="next" />,
    prevArrow: <NavArrow wrapperClass={styles['prev-arrow-wrapper']} type="prev" />
  }

  renderSlider(data) {
    return (
      <Slider {...this.settings}>
        {data.map(newsEntity => (
          <div key={uuid.create()}>
            <div className={styles['news-entity']}>
              <div className={styles['preview']}>
                <Link href={`/news/${newsEntity.url}`}>
                  <PreviewPicture
                    url={require('./../../assets/images' + newsEntity.thumbnailPath)}
                  />
                </Link>
              </div>
              <div className={styles['content']}>
                <Link href={`/news/${newsEntity.url}`}>
                  {newsEntity.heading}
                </Link>
                <div className={styles['bottom-line']}>
                  <div className={styles['data']}>
                    {formatDate(newsEntity.datePublished)}
                  </div>
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
