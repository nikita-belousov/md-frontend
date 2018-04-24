import React from 'react'
import { Route } from 'react-router-dom'

import Implantology from './../pages/category_pages/Implantology'
import Orthopedics from './../pages/category_pages/Orthopedics'
import Therapy from './../pages/category_pages/Therapy'
import Orthodontics from './../pages/category_pages/Orthodontics'
import Surgery from './../pages/category_pages/Surgery'
import ChildStomatology from './../pages/category_pages/ChildStomatology'
import Hygiene from './../pages/category_pages/Hygiene'

export default () => (
  <div>
    <Route
      exact path='/implantaciya'
      component={Implantology}
    />
    <Route
      exact path='/ortopediya'
      component={Orthopedics}
    />
    <Route
      exact path='/terapiya'
      component={Therapy}
    />
    <Route
      exact path='/gigiena'
      component={Hygiene}
    />
    <Route
      exact path='/ortodontiya'
      component={Orthodontics}
    />
    <Route
      exact path='/hirurgiya'
      component={Surgery}
    />
    <Route
      exact path='/detskaya-stomatologiya'
      component={ChildStomatology}
    />
  </div>
)
