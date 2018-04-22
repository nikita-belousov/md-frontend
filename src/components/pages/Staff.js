import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'small-uuid'

import { STAFF_PAGE_LOADED } from './../../constants/actionTypes'
import { ITEMS_ON_PAGE } from './../../constants/config'
import { Staff as StaffApi } from './../../agent'

import NarrowPage from './NarrowPage'
import Paragraph from '../common/Paragraph'
import PositionLabel from '../common/PositionLabel'

import styles from '../../styles/components/pages/Staff.css'

const mapStateToProps = state => ({
  ...state.staff
})

const mapDispatchToProps = dispatch => ({
  onLoad: (pager, payload) =>
    dispatch({ type: STAFF_PAGE_LOADED, pager, payload }),
  onUnload: () =>
    dispatch({ type: STAFF_PAGE_UNLOADED })
})

class Staff extends Component {
  componentWillMount() {
    this.props.onLoad(StaffApi.page, StaffApi.all())
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  renderDentist(doctor) {
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
    const { staff } = this.props
    if (!staff || staff.length === 0) return null

    return (
      <NarrowPage heading={'Наши врачи'} >
        <div className={styles['staff']}>
          {staff.map(this.renderDentist)}
        </div>
      </NarrowPage>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Staff)
