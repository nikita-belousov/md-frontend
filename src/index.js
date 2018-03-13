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
import FAQPage from './components/pages/FAQPage'
import Staff from './components/pages/Staff'
import Contacts from './components/pages/Contacts'
import PricelistPage from './components/pages/PricelistPage'
import SpecialPage from './components/pages/SpecialPage'
import NewsPage from './components/pages/NewsPage'

import Implantology from './components/pages/category_pages/Implantology'
import Orthopedics from './components/pages/category_pages/Orthopedics'
import Therapy from './components/pages/category_pages/Therapy'
import Orthodontics from './components/pages/category_pages/Orthodontics'
import Surgery from './components/pages/category_pages/Surgery'
import ChildStomatology from './components/pages/category_pages/ChildStomatology'
import Hygiene from './components/pages/category_pages/Hygiene'

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
            path='/faq'
            render={props =>
              <Layout>
                <FAQPage />
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
            exact path='/implantation'
            render={props =>
              <Layout>
                <Implantology />
              </Layout>
            } />
          <Route
            exact path='/orthopedics'
            render={props =>
              <Layout>
                <Orthopedics />
              </Layout>
            } />
          <Route
            exact path='/therapy'
            render={props =>
              <Layout>
                <Therapy />
              </Layout>
            } />
          <Route
            exact path='/orthodontics'
            render={props =>
              <Layout>
                <Orthodontics />
              </Layout>
            } />
          <Route
            exact path='/surgery'
            render={props =>
              <Layout>
                <Surgery />
              </Layout>
            } />
          <Route
            exact path='/child_stomatology'
            render={props =>
              <Layout>
                <ChildStomatology />
              </Layout>
            } />
          <Route
            exact path='/hygiene'
            render={props =>
              <Layout>
                <Hygiene />
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
