import React, { Component } from 'react'
import uuid from 'small-uuid'
import styles from '../../styles/components/pages/Staff.css'

import withFetch from './../HOCs/withFetch'
import NarrowPage from './NarrowPage'
import Paragraph from '../common/Paragraph'
import PositionLabel from '../common/PositionLabel'

class Staff extends Component {
  constructor(props) {
    super(props)

    this.data = this.props.fetchedData.map(item => {
      item.positions = item.positions.split(',').map(e => e.trim())
      return item
    })
  }

  renderDoctor(doctor) {
    let thumbSrc
    const { imageSource } = doctor
    if (imageSource) {
      thumbSrc = require(`../../assets/images/staff/${imageSource}/thumb.png`)
    }

    return (
      <div
        key={doctor.id}
        className={styles['doctor']}
      >
        <div className={styles['aside']}>
          <div
            className={styles['photo']}
            style={{ backgroundImage: thumbSrc ? `url(${thumbSrc})` : 'grey' }}
          />
        </div>
        <div className={styles['content']}>
          <div className={styles['main-info']}>
            <div className={styles['name']}>
              {doctor.name}
            </div>
            <div className={styles['positions-list']}>
              {doctor.positions.map(position =>
                <div
                  key={uuid.create()}
                  className={styles['label-wrapper']}
                >
                  <PositionLabel>
                    {position}
                  </PositionLabel>
                </div>
              )}
            </div>
            <div className={styles['experience']}>
              {`Стаж ${doctor.experience}`}
            </div>
          </div>
          <div className={styles['description']}>
            <Paragraph>
              {doctor.about}
            </Paragraph>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <NarrowPage heading={'Наши врачи'} >
        <div className={styles['staff']}>
          {this.data.map(this.renderDoctor)}
        </div>
      </NarrowPage>
    )
  }
}

export default withFetch(Staff, { api: 'staff' })
