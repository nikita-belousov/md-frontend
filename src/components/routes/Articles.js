import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { NarrowPage } from './../pages'
import ArticlePage from './../pages/ArticlePage'
import { Pagination } from './../pagination'
import { Preview, Article } from './../article'

const Articles = ({ path, title, api }) => (
  <div>
    <Route
      exact
      path={path}
      render={() => <Redirect to={`${path}/pages/0`} />}
    />
    <Route
      exact
      path={`${path}/:url`}
      render={({ match }) =>
        <ArticlePage
          api={api}
          query={`?url=${match.params.url}`}
        />
      }
    />
    <Route
      exact
      path={`${path}/pages/:num`}
      render={({ match }) =>
        <NarrowPage
          squeeze={true}
          heading={title}
        >
          <Pagination
            api={api}
            path={path}
            itemComponent={Preview}
            pageToShow={parseInt(match.params.num)}
            sort='datePublished'
          />
        </NarrowPage>
      }
    />
  </div>
)

export default Articles
