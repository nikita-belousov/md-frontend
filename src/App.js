import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router,
  Route,
  div,
  Link
} from 'react-router-dom'

import 'normalize-css'
import './styles/global.css'
import './styles/myfonts.css'
import styles from './styles/components/App.css'

import Layout from './components/pages/Layout'
import NotFound from './components/pages/NotFound'
import HomePage from './components/pages/HomePage'
import ReviewsPage from './components/pages/ReviewsPage'
import Staff from './components/pages/Staff'
import Contacts from './components/pages/Contacts'
import PricelistPage from './components/pages/PricelistPage'
import NewsPage from './components/pages/NewsPage'
import ArticlePage from './components/pages/ArticlePage'

import Implantology from './components/pages/category_pages/Implantology'
import Orthopedics from './components/pages/category_pages/Orthopedics'
import Therapy from './components/pages/category_pages/Therapy'
import Orthodontics from './components/pages/category_pages/Orthodontics'
import Surgery from './components/pages/category_pages/Surgery'
import ChildStomatology from './components/pages/category_pages/ChildStomatology'
import Hygiene from './components/pages/category_pages/Hygiene'

import * as pages from './components/pages'
import * as routes from './components/routes'

class App extends Component {
  static childContextTypes = {
    onPageNotFound: PropTypes.func
  }

  state = {
    pageNotFound: false
  }

  getChildContext() {
    return {
      onPageNotFound: () => {
        this.setState({ pageNotFound: true })
      }
    }
  }

  renderRoutes() {
    return (
      <div>
        <Route
          exact path='/'
          component={HomePage}
        />
        <Route
          exact path='/about-us'
          component={pages.AboutUsPage}
        />
        <Route
          exact path='/pricelist'
          component={PricelistPage}
        />
        <routes.Articles
          path='/news'
          title='Новости'
          api='news'
        />
        <routes.Articles
          path='/specials'
          title='Акции'
          api='special'
        />
        <routes.Reviews />
        <routes.Questions />
        <Route
          exact path='/staff'
          component={Staff}
        />
        <Route
          exact path='/contacts'
          component={Contacts}
        />
        <Route
          exact path='/implantation'
          component={Implantology}
        />
        <Route
          exact path='/orthopedics'
          component={Orthopedics}
        />
        <Route
          exact path='/therapy'
          component={Therapy}
        />
        <Route
          exact path='/orthodontics'
          component={Orthodontics}
        />
        <Route
          exact path='/surgery'
          component={Surgery}
        />
        <Route
          exact path='/child_stomatology'
          component={ChildStomatology}
        />
        <Route
          exact path='/hygiene'
          component={Hygiene}
        />
        <Route render={this.renderNotFound} />
      </div>
    )
  }

  render() {
    return (
      <Router>
        <Layout>
          {this.state.pageNotFound
            ? <NotFound />
            : this.renderRoutes()}
        </Layout>
      </Router>
    )
  }
}

export default App
