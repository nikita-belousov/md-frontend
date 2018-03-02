import React, { Component } from 'react'
import withFetch from './../HOCs/withFetch'
import NarrowPage from './NarrowPage'

const NewsPage = ({ fetchedData }) => {
  const renderPage = (heading, content) => (
    <NarrowPage heading={heading}>
      {content}
    </NarrowPage>
  )

  return (fetchedData && fetchedData.heading)
    ? renderPage(fetchedData.heading, fetchedData.text)
    : null
}

export default withFetch(NewsPage)
