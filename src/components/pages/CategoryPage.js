import React, { Component } from 'react'
import styles from './../../styles/components/pages/CategoryPage.css'
import NarrowPage from './NarrowPage'
import { PricelistTable } from './../pricelist'

class CategoryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: null,
      pricelist: null
    }
    if (props.doctors) {
      this.state.doctors = []
    }
  }

  componentDidMount() {
    const { categoryId, doctors } = this.props

    if (doctors) {
      doctors.forEach((doctorId, i) => {
        fetch(`${process.env.REACT_APP_API_ROOT}/staff?_id=${doctorId}`)
          .then(data => data.json())
          .then(json => {
            this.setState(prev => {
              return {
                ...prev,
                doctors: [ ...prev.doctors, json[0] ]
              }
            })
          })
      })
    }

    fetch(`${process.env.REACT_APP_API_ROOT}/service?category=${this.props.categoryId}&_sort=order`)
      .then(data => data.json())
      .then(pricelist => this.setState(prev => _.merge(prev, { pricelist })))

    fetch(`${process.env.REACT_APP_API_ROOT}/category?_id=${this.props.categoryId}`)
      .then(data => data.json())
      .then(json => this.setState(prev => _.merge(prev, { title: json[0].title })))
  }

  isFetched() {
    let res = true

    Object
      .keys(this.state)
      .forEach(key => {
        if (key === 'doctors') {
          if (this.state.doctors.length !== this.props.doctors.length) {
            res = false
          }
        } else {
          if (!this.state[key]) {
            res = false
          }
        }
      }, true)

    return res
  }

  renderDoctor(doctor) {
    let fullSrc
    const { imageSource } = doctor
    if (imageSource) {
      fullSrc = require(`../../assets/images/staff/${imageSource}/full.png`)
    }

    return (
      <div
        key={doctor.id}
        className={styles['doctor']}
      >
        <div
          className={styles['photo']}
          style={{ backgroundImage: `url(${fullSrc})` }}
        />
        <div className={styles['about']}>
          <div className={styles['name']}>
            {doctor.name}
          </div>
          {doctor.positions}
        </div>
      </div>
    )
  }

  render() {
    if (!this.isFetched()) return null

    const { title, doctors, pricelist } = this.state

    return (
      <div>
        <NarrowPage heading={title}>
          <div className={styles['columns']}>
            <div className={styles['content']}>
              {this.props.renderContent()}
            </div>
            <div className={styles['aside']}>
              {doctors && doctors.map(this.renderDoctor)}
            </div>
          </div>
          <div className={styles['pricelist']}>
            <PricelistTable data={[{ title, services: pricelist }]} />
          </div>
        </NarrowPage>
      </div>
    )
  }
}

export default CategoryPage
