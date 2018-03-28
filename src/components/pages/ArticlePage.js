import React from 'react'
import { withFetch } from './../HOCs'
import { NarrowPage } from './../pages'

const ArticlePage = ({ dataArticle }) => (
  <NarrowPage
    squeeze={true}
    title={dataArticle.title}
  >
    <Article {...dataArticle} />
  </NarrowPage>
)

export default withFetch(ArticlePage)
