import React, { Component } from 'react'
import styles from './../../styles/components/pages/CategoryPage.css'

import NarrowPage from './NarrowPage'

class CategoryPage extends Component {
  state = {
    fetched: {
      title: null,
      doctor: null,
      pricelist: null
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_ROOT}/staff?_id=${this.props.doctorId}`)
      .then(data => data.json())
      .then(json => this.updateFetched('doctor', json[0]))

    fetch(`${process.env.REACT_APP_API_ROOT}/service?category=${this.props.categoryId}&_sort=order`)
      .then(data => data.json())
      .then(json => this.updateFetched('pricelist', json))

    fetch(`${process.env.REACT_APP_API_ROOT}/category?_id=${this.props.categoryId}`)
      .then(data => data.json())
      .then(json => this.updateFetched('title', json[0].title))
  }

  updateFetched = (key, data) => {
    this.setState(prev => _.merge(prev, {
      fetched: { [key]: data }
    }))
  }

  isFetched() {
    const { fetched } = this.state
    return Object.keys(fetched).reduce((res, key) => {
      return !!fetched[key]
    }, true)
  }

  render() {
    if (!this.isFetched()) return null

    const { title, doctor, pricelist } = this.state.fetched
    const doctorPhoto = require(`./../../assets/images/staff/${doctor.photo}`)

    return (
      <div>
        <NarrowPage heading={title}>
          <div className={styles['columns']}>
            <div className={styles['content']}>
              {this.props.renderContent()}
              <div className={styles['pricelist']}>
                
              </div>
            </div>
            <div className={styles['aside']}>
              <div className={styles['doctor']}>
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
            </div>
          </div>
        </NarrowPage>
      </div>
    )
  }
}

export default CategoryPage
