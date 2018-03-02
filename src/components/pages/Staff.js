import React, { Component } from 'react'
import uuid from 'small-uuid'
import styles from '../../styles/components/pages/Staff.css'
import NarrowPage from './NarrowPage'
import Paragraph from '../common/Paragraph'
import PositionLabel from '../common/PositionLabel'

const staffData = [
  {
    name: 'Юров Руслан Викторович',
    positions: ['врач-стоматолог', 'ортопед'],
    description: 'Проводит протезирование на имплантах системы Bio-tech, Straumann, Nobel, Xive, MIS, AlphaBio, изготовление прямым методом временных защитных коронок, ортопедическое лечение в полном объеме.',
    experience: 15,
    photo: 'yurov.png'
  },
  {
    name: 'Юров Руслан Викторович',
    positions: ['врач-стоматолог', 'ортопед'],
    description: 'Проводит протезирование на имплантах системы Bio-tech, Straumann, Nobel, Xive, MIS, AlphaBio, изготовление прямым методом временных защитных коронок, ортопедическое лечение в полном объеме.',
    experience: 15,
    photo: 'yurov.png'
  },
  {
    name: 'Юров Руслан Викторович',
    positions: ['врач-стоматолог', 'ортопед'],
    description: 'Проводит протезирование на имплантах системы Bio-tech, Straumann, Nobel, Xive, MIS, AlphaBio, изготовление прямым методом временных защитных коронок, ортопедическое лечение в полном объеме.',
    experience: 15,
    photo: 'yurov.png'
  },
  {
    name: 'Юров Руслан Викторович',
    positions: ['врач-стоматолог', 'ортопед'],
    description: 'Проводит протезирование на имплантах системы Bio-tech, Straumann, Nobel, Xive, MIS, AlphaBio, изготовление прямым методом временных защитных коронок, ортопедическое лечение в полном объеме.',
    experience: 15,
    photo: 'yurov.png'
  }
]

class Staff extends Component {
  renderDoctor(doctor) {
    const photoUrl = require(`../../assets/images/staff/${doctor.photo}`)

    return (
      <div className={styles['doctor']}>
        <div className={styles['aside']}>
          <div
            className={styles['photo']}
            style={{ backgroundImage: `url(${photoUrl})` }}
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
              {`Стаж ${doctor.experience} лет`}
            </div>
          </div>
          <div className={styles['description']}>
            <Paragraph>
              {doctor.description}
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
          {staffData.map(this.renderDoctor)}
        </div>
      </NarrowPage>
    )
  }
}

export default Staff
