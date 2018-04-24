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
import Contacts from './components/pages/Contacts'
import PricelistPage from './components/pages/PricelistPage'
import NewsPage from './components/pages/NewsPage'
import ArticlePage from './components/pages/ArticlePage'

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
        <Route
          exact path='/contacts'
          component={Contacts}
        />

        <routes.Specials />
        <routes.News />
        <routes.Reviews />
        <routes.Questions />
        <routes.Staff />

        <routes.ServiceCategories />

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
