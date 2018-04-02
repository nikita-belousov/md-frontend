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
// import SpecialsPage from './components/pages/SpecialsPage'
import ArticlePage from './components/pages/ArticlePage'

import Implantology from './components/pages/category_pages/Implantology'
import Orthopedics from './components/pages/category_pages/Orthopedics'
import Therapy from './components/pages/category_pages/Therapy'
import Orthodontics from './components/pages/category_pages/Orthodontics'
import Surgery from './components/pages/category_pages/Surgery'
import ChildStomatology from './components/pages/category_pages/ChildStomatology'
import Hygiene from './components/pages/category_pages/Hygiene'

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
      <Switch>
        <Route
          exact path='/'
          render={props =>
            <HomePage />
          } />
        <Route
          exact path='/pricelist'
          render={props =>
            <PricelistPage api='service?_limit=false&_sort=order' />
          } />
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
        <Route
          path='/reviews'
          render={props =>
            <ReviewsPage />
          } />
        <Route
          path='/faq'
          render={props =>
            <FAQPage />
          } />
        <Route
          exact path='/staff'
          render={props =>
            <Staff api='staff' />
          } />
        <Route
          exact path='/contacts'
          render={props =>
            <Contacts />
          } />
        <Route
          exact path='/news/:url'
          render={props =>
            <ArticlePage
              handleNotFound
              api={`news/?url=${props.match.params.url}`}
            />
          } />
        <Route
          exact path='/special/:url'
          render={props =>
            <ArticlePage
              handleNotFound
              api={`special/?url=${props.match.params.url}`}
            />
          } />
        <Route
          exact path='/implantation'
          render={props =>
            <Implantology />
          } />
        <Route
          exact path='/orthopedics'
          render={props =>
            <Orthopedics />
          } />
        <Route
          exact path='/therapy'
          render={props =>
            <Therapy />
          } />
        <Route
          exact path='/orthodontics'
          render={props =>
            <Orthodontics />
          } />
        <Route
          exact path='/surgery'
          render={props =>
            <Surgery />
          } />
        <Route
          exact path='/child_stomatology'
          render={props =>
            <ChildStomatology />
          } />
        <Route
          exact path='/hygiene'
          render={props =>
            <Hygiene />
          } />

        <Route render={this.renderNotFound} />
      </Switch>
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
