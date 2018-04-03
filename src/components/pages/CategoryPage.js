import React, { Component } from 'react'
import styles from './../../styles/components/pages/CategoryPage.css'
import NarrowPage from './NarrowPage'
import { PricelistTable } from './../pricelist'

class CategoryPage extends Component {
  state = {
    title: null,
    doctors: [],
    pricelist: null
  }

  componentDidMount() {
    const { categoryId, doctors } = this.props

    doctors.forEach((doctorId, i) =>
      fetch(`${process.env.REACT_APP_API_ROOT}/staff?_id=${doctorId}`)
        .then(data => data.json())
        .then(json => this.setState(prev => ({
          ...prev, doctors: [...prev.doctors, json[0]]
        }))))

    fetch(`${process.env.REACT_APP_API_ROOT}/service?category=${this.props.categoryId}&_sort=order`)
      .then(data => data.json())
      .then(pricelist => this.setState(prev => _.merge(prev, { pricelist })))

    fetch(`${process.env.REACT_APP_API_ROOT}/category?_id=${this.props.categoryId}`)
      .then(data => data.json())
      .then(json => this.setState(prev => _.merge(prev, { title: json[0].title })))
  }

  isFetched() {
    return Object.keys(this.state).reduce((res, key) => {
      if (key === 'doctors') {
        return this.state.doctors.length === this.props.doctors.length
      } else {
        return !!this.state[key]
      }
    }, true)
  }

  renderDoctor(doctor) {
    const doctorPhoto = require(`./../../assets/images/staff/${doctor.photo}`)

    return (
      <div
        key={doctor.id}
        className={styles['doctor']}
      >
        <div
          className={styles['photo']}
          style={{ backgroundImage: `url(${doctorPhoto})` }}
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
              {doctors.map(this.renderDoctor)}
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
