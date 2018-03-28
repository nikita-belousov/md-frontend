import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { NarrowPage, ArticlePage } from './../pages'
import { Pagination } from './../pagination'
import { ArticlePreview } from './../'

const Articles = ({ path, title }) => (
  <div>
    <Route
      exact
      path={path}
      render={<Redirect to={`/${path}/pages/0`} />}
    />
    <Route
      exact
      path={`/${path}/:url`}
      component={ArticlePage}
    />
    <Route
      exact
      path={`/${path}/pages/:num`}
      render={({ match }) =>
        <NarrowPage
          squeeze={true}
          title={title}
        >
          <Pagination
            api={path}
            itemComponent={ArticlePreview}
            pageToShow={match.params.num}
            sort='datePublished'
          />
        </NarrowPage>
      }
    />
  </div>
)

export default Articles
