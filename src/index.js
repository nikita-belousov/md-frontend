import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router,
  Route,
  Switch,
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
import SpecialPage from './components/pages/SpecialPage'
import NewsPage from './components/pages/NewsPage'

import Implantology from './components/pages/category_pages/Implantology'

class App extends Component {
  static childContextTypes = {
    onPageNotFound: PropTypes.func
  }

  state = { pageNotFound: false }

  getChildContext() {
    return {
      onPageNotFound: () => this.setState({ pageNotFound: true })
    }
  }

  renderRoutes() {
    return (
      <Router>
        <Switch>
          <Route
            exact path='/'
            render={props =>
              <Layout>
                <HomePage />
              </Layout>
            } />
          <Route
            exact path='/pricelist'
            render={props =>
              <Layout>
                <PricelistPage api='service?_limit=false&_sort=order' />
              </Layout>
            } />
          <Route
            path='/reviews'
            render={props =>
              <Layout>
                <ReviewsPage />
              </Layout>
            } />
          <Route
            exact path='/staff'
            render={props =>
              <Layout>
                <Staff api='staff' />
              </Layout>
            } />
          <Route
            exact path='/contacts'
            render={props =>
              <Layout>
                <Contacts />
              </Layout>
            } />

          <Route
            exact path='/news/:id'
            render={props =>
              <Layout>
                <NewsPage api={`news/${props.match.params.id}`} />
              </Layout>
            } />
          <Route
            exact path='/special/:id'
            render={props =>
              <Layout>
                <SpecialPage api={`special/${props.match.params.id}`} />
              </Layout>
            } />
          <Route
            exact path='/implantology'
            render={props =>
              <Layout>
                <Implantology />
              </Layout>
            } />

          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }

  render() {
    return this.state.pageNotFound
     ? <NotFound />
     : this.renderRoutes()
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
