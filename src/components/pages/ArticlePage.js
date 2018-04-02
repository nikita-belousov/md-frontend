import React from 'react'
import { withFetch } from './../HOCs'
import { NarrowPage } from './../pages'
import { Article } from './../article/index'

const ArticlePage = ({ fetchedData }) => (
  <NarrowPage
    squeeze={true}
    title={fetchedData.title}
  >
    <Article {...fetchedData} />
  </NarrowPage>
)

export default withFetch(ArticlePage)
