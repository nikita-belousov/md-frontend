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
import NewsPage from './components/pages/NewsPage'
import SpecialsPage from './components/pages/SpecialsPage'
import ArticlePage from './components/pages/ArticlePage'

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

  renderNotFound() {
    return (
      <Layout>
        <NotFound />
      </Layout>
    )
  }

  renderRoutes() {
    return (
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
          exact path='/news'
          render={props =>
            <Layout>
              <NewsPage />
            </Layout>
          } />
        <Route
          exact path='/special'
          render={props =>
            <Layout>
              <SpecialsPage />
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
          exact path='/news/:url'
          render={props =>
            <Layout>
              <ArticlePage
                handleNotFound
                api={`news/?url=${props.match.params.url}`}
              />
            </Layout>
          } />
        <Route
          exact path='/special/:url'
          render={props =>
            <Layout>
              <ArticlePage
                handleNotFound
                api={`special/?url=${props.match.params.url}`}
              />
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

        <Route render={this.renderNotFound} />
      </Switch>
    )
  }

  render() {
    return (
      <Router>
        {this.state.pageNotFound
          ? this.renderNotFound()
          : this.renderRoutes()}
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
