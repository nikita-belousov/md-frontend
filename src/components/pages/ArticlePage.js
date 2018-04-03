import React from 'react'
import { withFetch } from './../HOCs'
import { NarrowPage } from './../pages'
import { Article } from './../article'

const ArticlePage = ({ fetchedData }) => (
  <NarrowPage
    squeeze={true}
    heading={fetchedData.title}
  >
    <Article {...fetchedData} />
  </NarrowPage>
)

export default withFetch(ArticlePage)
